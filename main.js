const {app, BrowserWindow} = require('electron');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            sandbox: false, //La neta este codigo me da miedo.... 
            preload: path.join(__dirname, 'dist/main.js')
        }
    });

    win.loadFile('./dist/index.html');
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit();
})
