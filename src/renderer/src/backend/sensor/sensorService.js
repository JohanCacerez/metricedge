import { join } from "path";
import { exec } from "child_process";
import { app } from "electron";

import { queryDatabase, insertIntoDatabase, runQuery } from '../dbService'

// Usando la ruta base del programa (userData)
const basePath = app.getPath("userData");

// Construimos la ruta relativa al directorio 'src/renderer/src/backend/sensor/'
const sensor1Path = join(basePath, "prueba.py");

export const readSensor = async (port, mm, zero, device) => {
  return new Promise((resolve) => {
    exec(
      `py "${sensor1Path}" ${port} ${mm} ${zero} ${device}`,
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

export const createMeasurement = async (dataArray) => {
  try {
    const [userId, model, ...values] = dataArray;

    // Verificamos que el usuario exista
    const userExists = queryDatabase('SELECT * FROM users WHERE id = ?', [userId]);
    if (userExists.length === 0) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    // Calcular suma, promedio y rango
    const numericValues = values.map(Number); // Por si vienen como strings
    const sum = numericValues.reduce((acc, val) => acc + val, 0);
    const average = sum / numericValues.length;
    const range = Math.max(...numericValues) - Math.min(...numericValues);

    // Insertamos en measurements
    const insertMeasurementQuery = `
      INSERT INTO measurements (model, user_id, total_measurements, median, range)
      VALUES (?, ?, ?, ?, ?)
    `;
    const { id: measurementId } = insertIntoDatabase(insertMeasurementQuery, [
      model, userId, sum, average, range
    ]);

    // Insertamos cada valor en measurement_values
    const insertValueQuery = `
      INSERT INTO measurement_values (measurement_id, position_index, value) VALUES (?, ?, ?)
    `;
    numericValues.forEach((value, index) => {
      runQuery(insertValueQuery, [measurementId, index, value]);
    });

    return { success: true, measurementId };
  } catch (error) {
    console.error('Error al crear medición:', error);
    return { success: false, message: 'Error al registrar la medición' };
  }
};


