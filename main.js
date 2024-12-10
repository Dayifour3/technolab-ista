const { ipcMain, dialog } = require('electron');
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true // Activer l'intégration Node.js
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('get-backend-data', (event, arg) => {
    // Faites une requête HTTP vers votre serveur backend (par exemple, avec axios ou fetch)
    // Traitez la réponse et renvoyez-la au processus de rendu
    event.reply('backend-data', 'Données depuis le backend');
});




