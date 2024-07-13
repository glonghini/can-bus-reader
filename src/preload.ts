// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import api from './api'
const { contextBridge } = require('electron/renderer')

contextBridge.exposeInMainWorld('api', api)