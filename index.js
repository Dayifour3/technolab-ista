const {ipcMain, dialog} = require('electron');
const {app, BrowserWindow} = require("electron/main")
const XLSX = require("xlsx");
const ExcelJS = require("exceljs");
const { cas1 } = require('./cas1');
const { cas2 } = require('./cas2');

if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    mainWindow.loadFile("index.html")

    mainWindow.on('closed', function(){
        mainWindow = null
    })
}

ipcMain.on('open-directory-dialog', (event) => {
    dialog.showOpenDialog(mainWindow, {
        title: 'Sélectionner un dossier',
        properties: ['openDirectory']
    }).then(result => {
        if (!result.canceled) {
            event.sender.send('selected-directory', result.filePaths[0]);
        }
    }).catch(err => {
        console.error('Erreur lors de la sélection du dossier :', err);
    });
});

ipcMain.on("process-image", (event, filePath, directeur, emplacement, nom)=>{
   cas1(event, filePath, directeur, emplacement, nom);
})
ipcMain.on("process-file", (event, filePath, directeur, emplacement, nom)=>{
   cas2(event, filePath, directeur, emplacement, nom);
    
})
app.whenReady().then(createWindow)
