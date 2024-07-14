const { ipcRenderer } = require('electron/renderer')

export default {
  listPorts: () => ipcRenderer.invoke('listPorts'),
  openConnection: (path: string) => ipcRenderer.invoke('openConnection', path),
  closeConnection: () => ipcRenderer.invoke('closeConnection'),
  startStream: () => ipcRenderer.invoke('startStream'),
  readStream: (onData: (value: string) => void) => ipcRenderer.on('readStream', (_event, value: string) => onData(value))
}