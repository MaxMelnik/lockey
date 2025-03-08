const {app, BrowserWindow} = require('electron');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        transparent: false,
        alwaysOnTop: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadFile('./pages/index.html');

    // mainWindow.webContents.openDevTools();
});