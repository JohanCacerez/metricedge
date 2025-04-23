// backend/users/userController.js

import { ipcMain } from 'electron'

import { getPromMeasurements, getRangeMeasurements } from './measureService'

export const measureIPCListeners = () => {
  ipcMain.handle('get-prom-measurements', async () => {
    return getPromMeasurements()
  })
  ipcMain.handle('get-range-measurements', async () => {
    return getRangeMeasurements()
  })
}
