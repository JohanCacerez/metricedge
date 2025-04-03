import { ipcMain } from "electron";
import { readSensor } from "./sensorService";

export const readSensorIPCListeners = () => {
  ipcMain.handle("read-sensor", async (_, port, mm, zero) => {
    console.log(zero, "controler")
    return readSensor(port, mm, zero);
  })
  /*
  ipcMain.handle('read-sensor2', async (_, port, mm) => {
    console.log("controller2", port, mm)
    return readSensor2(port, mm)
  }) */
};
