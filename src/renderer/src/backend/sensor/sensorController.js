import { ipcMain } from "electron";
import { readSensor, createMeasurement } from "./sensorService";

export const readSensorIPCListeners = () => {
  ipcMain.handle("read-sensor", async (_, port, mm, zero) => {
    return readSensor(port, mm, zero);
  })
  ipcMain.handle("create-measurement", async (_, dataArray) => {
    return createMeasurement(dataArray);
  })
};
