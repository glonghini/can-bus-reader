import { ipcMain, webContents } from "electron"
import { SerialPort } from "serialport"

var port: SerialPort | null = null

ipcMain.handle('listPorts', async () => {
  try {
    const ports = await SerialPort.list()

    return ports
  } catch (err) {
    console.log(err)
  }
})

ipcMain.handle('openConnection', async (event, path: string) => {
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

ipcMain.handle('readStream', () => {
  if (port) port.on('data', (data) => data)
})