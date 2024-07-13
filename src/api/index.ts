const { ipcRenderer } = require('electron/renderer')

export default {
  setWindowTitle: (title: string) => ipcRenderer.send('set-title', title),
  listPorts: () => ipcRenderer.invoke('listPorts'),
  openConnection: (path: string) => ipcRenderer.invoke('openConnection', path),
  readStream: (callback: (value: string) => void) => ipcRenderer.on('readStream', (_event, value: string) => callback(value))
}