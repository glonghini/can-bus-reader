import { app, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs'
import path from 'path'
import { ReadlineParser, SerialPort } from 'serialport'

var mainWindow: BrowserWindow | null = null
var port: SerialPort | null = null
const writer = fs.createWriteStream(path.join(process.cwd(), 'file.txt'), 'utf-8')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.maximize()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => createWindow())

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('listPorts', async () => {
  try {
    const ports = await SerialPort.list()

    return ports
  } catch (err) {
    console.log(err)
  }
})

ipcMain.handle('openConnection', (event, path: string) => {
  try {
    port = new SerialPort({
      path,
      baudRate: 115200,
      autoOpen: false
    })

    port.open((err) => {
      if (err) return console.log('Error when opening port', err)
    })

    return true
  } catch (err) {
    console.log(err)

    return false
  }
})

ipcMain.on('startStream', () => {
  try {
    const _port = port.pipe(new ReadlineParser({ encoding: 'utf-8' }))

    _port.on('data', (data) => {
      mainWindow.webContents.send('readStream', data)

      writer.write(data.toString().replace(' ', ',') + '\n')
    })
  } catch (err) {
    console.log(err)
  }
})

ipcMain.handle('closeConnection', () => {
  try {
    if (port && port.open) port.close()

    writer.end()

    return true
  } catch (err) {
    console.log(err)

    return false
  }
})

// ipcMain.handle('saveStream', () => {
//   // Create a pipestream to a file to save the readStream
//   try {
//     if (port && port.open) {
//       // const _port = port.pipe(new ReadlineParser({ encoding: 'utf-8' }))

//       port.on('data', (data: Buffer) => {
//       })
//     }
//   } catch (err) {
//     console.log(err)
//   }
// })

