const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Calendar',
        width: 1240,
        height: 720,
        autoHideMenuBar: true,
    })

    mainWindow.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') app.quit()
})