const axios = require('axios').default
const { Buffer } = require('buffer')

const root = "https://api.ecoledirecte.com/"

module.exports = class EcoleDirecte {
    constructor(username, password) {
        this.username = username
        this.password = password
    }

    login() {
        return new Promise((resolve, reject) => {
            const params = {
                url: root + 'v3/login.awp',
                body: `data={ "identifiant": "${this.username}", "motdepasse": "${this.password}" }`
            }

            axios.post(params.url, params.body).then(res => {
                if(res.data.code === 200) {
                    resolve({
                        "token": res.data.token,
                        "accountId": res.data.data.accounts[0].id
                    })
                }else {
                    reject("Invalid status code!")
                }
            })
        })
    }

    fetch(makeURL, infos, bodyData) {
        return new Promise((resolve, reject) => {
            this.login().then((loginInfo) => {
                const params = {
                    url: makeURL(loginInfo, infos),
                    body: `data={ "token": "${loginInfo.token}", ${bodyData} }`
                }

                axios.post(params.url, params.body).then(res => {
                    if(res.data.code === 200) {
                        resolve(res.data)
                    }else if(res.data.code == 520) {
                        reject("Invalid Token!")
                    }else {
                        reject("Unknown error!")
                    }
                })
            })
        })
    }

    removeHtml(text) {
        var tmp = document.createElement('div')
        tmp.innerHTML = text
        return tmp.textContent || tmp.innerText || ""
    }

    getHomeworksWithoutDate() {
        return new Promise((resolve, reject) => {
            this.fetch((loginInfo, infos) => {
                return `${root}v3/Eleves/${loginInfo.accountId}/cahierdetexte.awp?verbe=get`
            },
            {}, "").then(raw => {
                var disciplines = []
                if(raw.data.matieres === {}) {
                    return disciplines
                }else { 
                    raw.data.matieres.forEach(discipline => {
                        disciplines.push({
                            "disciplineCode": discipline.codeMatiere,
                            "disciplineName": discipline.matiere,
                            "teacherName": discipline.nomProf,
                            "assignement": this.removeHtml(Buffer.from(discipline.aFaire.contenu, 'base64').toString('utf-8')),
                            "onlineFullFillement": discipline.aFaire.rendreEnLigne,
                        })
                    })
                }
                return disciplines
            })
        })
    }

    getHomeworks(date) {
        return new Promise((resolve, reject) => {
            this.fetch((loginInfo, infos) => {
                return `${root}v3/Eleves/${loginInfo.accountId}/cahierdetexte/${infos.date}.awp?verbe=get`
            },
            { "date": date }, "").then(raw => {
                var disciplines = []
                if(raw.data.matieres !== []) {
                    raw.data.matieres.forEach(discipline => {
                        disciplines.push({
                            "disciplineCode": discipline.codeMatiere,
                            "disciplineName": discipline.matiere,
                            "teacherName": discipline.nomProf,
                            "assignement": this.removeHtml(Buffer.from(discipline.aFaire.contenu, 'base64').toString('utf-8')),
                            "onlineFullFillement": discipline.aFaire.rendreEnLigne,
                        })
                    })
                }else { return disciplines }
                return disciplines
            })
        })
    }
}