import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  //users
  getUsers: () => ipcRenderer.invoke('get-users'),
  createUser: (id, name, password, range) =>
    ipcRenderer.invoke('create-user', id, name, password, range),
  loginUser: (name, password) => ipcRenderer.invoke('login-user', name, password),
  searchUserById: (id) => ipcRenderer.invoke('search-user-by-id', id),
  userDelete: (id) => ipcRenderer.invoke('user-delete', id),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
