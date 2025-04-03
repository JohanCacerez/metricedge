import { join } from "path";
import { exec } from "child_process";
import { app } from "electron";

// Usando la ruta base del programa (userData)
const basePath = app.getPath("userData");

// Construimos la ruta relativa al directorio 'src/renderer/src/backend/sensor/'
const sensor1Path = join(basePath, "sensor1.py");
const sensor2Path = join(basePath, "sensor2.py");

export const readSensor = async (port, mm, zero) => {
  return new Promise((resolve) => {
    exec(
      `py "${sensor1Path}" ${port} ${mm} ${zero}`,
      (error, stdout, stderr) => {
        if (error) {
          resolve(`Error: ${error.message}`);
        } else if (stderr) {
          resolve(`Error: ${stderr}`);
        } else {
          resolve(stdout.trim()); // Eliminamos espacios y saltos de línea extra
        }
      },
    );
  });
};

export const setZero = async (port, mm, zero) => {
  return new Promise((resolve, reject) => {
    // Ejecutamos el script Python para establecer el nuevo "cero"
    exec(
      `py "${sensor1Path}" ${port} ${mm} ${zero}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
        } else if (stderr) {
          reject(`Error: ${stderr}`);
        } else {
          resolve(stdout.trim()); // Retorna el valor de referencia (nuevo cero)
        }
      },
    );
  });
};
