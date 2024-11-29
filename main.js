const {app, BrowserWindow} = require('electron');
const path = require('node:path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            sandbox: false, //La verdad este codigo me da miedo.... 
            preload: path.join(__dirname, 'dist/main.js')
        }
    });

    win.webContents.session.setCertificateVerifyProc((request, callback) => {
        const { hostname } = request
        if (hostname === 'localhost') { // Este es el host del cual el navegador de electron va a hace la vista de lado
          callback(0); 
        } else {
          callback(-3); //este es para rechazar el CA autofirmado si es que no esta en el localhost
        }
      })

    win.loadFile('./dist/index.html');
}

app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit();
})
