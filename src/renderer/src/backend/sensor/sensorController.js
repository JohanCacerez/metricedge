import { ipcMain } from "electron";
import { readSensor, createMeasurement } from "./sensorService";

export const readSensorIPCListeners = () => {
  ipcMain.handle("read-sensor", async (_, port, mm, zero, device) => {
    return readSensor(port, mm, zero, device);
  })
  ipcMain.handle("create-measurement", async (_, dataArray) => {
    return createMeasurement(dataArray);
  })
};
