module.exports = class Pronote {
    constructor(url, username, password) {
        this.url = url
        this.username = username
        this.password = password
    }

    async login() {
        const server = this.getServer(this.url)
        
    }

    getServer(url) {
        if(url.endsWith('.html')) {
            return url.substring(0, url.lastIndexOf('/') + 1)
        }

        if(!url.endsWith('/')) {
            url += '/'
        }

        return url
    }
}