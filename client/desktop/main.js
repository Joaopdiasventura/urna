const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            devTools: false,
        },
    });

    const appUrl = 'http://localhost:4200/';
    mainWindow.loadURL(appUrl);

    mainWindow.maximize();

    mainWindow.on('closed', () =>
        mainWindow = null
    );
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin')
        app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length == 0)
        createMainWindow();
});
