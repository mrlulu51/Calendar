const { app, BrowserWindow } = require("electron")

const initWindow = () => {
    const window = new BrowserWindow({
        width: 1240,
        height: 720,
        autoHideMenuBar: true
    })

    window.loadFile('assets/login.html')
}

app.whenReady().then(() => {
    initWindow()
})