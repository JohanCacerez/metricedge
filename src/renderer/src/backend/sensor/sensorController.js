import { ipcMain } from 'electron'
import {readSensor, readSensor2} from './sensorService'

export const readSensorIPCListeners = () => {
  ipcMain.handle('read-sensor', async () => {
    return readSensor()
  }),
  ipcMain.handle('read-sensor2', async () => {
    return readSensor2()
  })
}