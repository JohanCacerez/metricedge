import { useModel } from "../context/modelContext"; // Importa el contexto de modelos
import { useState, useEffect } from "react";

const ModelChange = () => {
  const { selectedModel, models, sensors, selectedSensor1, selectedSensor2 } =
    useModel();
  const activeModel = models.find((model) => model.name === selectedModel);
  const [sensorData, setSensorData] = useState("Cargando...");
  const [sensorData2, setSensorData2] = useState("Cargando...");

  const handleReadSensor = () => {
    window.api
      .readSensor()
      .then((data) => {
        if (data.startsWith("Error:")) {
          setSensorData("Error al leer el sensor");
          console.log(data);
        } else {
          setSensorData(data);
        }
      })
      .catch(() => setSensorData("Error al comunicarse con el sensor"));

    window.api
      .readSensor2()
      .then((data) => {
        if (data.startsWith("Error:")) {
          setSensorData2("Error al leer el sensor");
        } else {
          setSensorData2(data);
        }
      })
      .catch(() => setSensorData2("Error al comunicarse con el sensor"));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleReadSensor();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mx-auto p-6 h-80 bg-white rounded-lg shadow-lg flex flex-col justify-between">
      <h2 className="text-xl font-semibold text-gray-800">Modelo Actual</h2>
      {activeModel ? (
        <div className="mt-4">
          <p className="text-lg text-gray-600">Nombre: {activeModel.name}</p>
          <p className="text-lg text-gray-600">
            Sensor1: {selectedSensor1} (
            {sensors.find((sensor) => sensor.name === selectedSensor1)?.mm} mm)
          </p>
          <p className="text-lg text-gray-600">
            Sensor2: {selectedSensor2} (
            {sensors.find((sensor) => sensor.name === selectedSensor2)?.mm} mm)
          </p>
        </div>
      ) : (
        <p className="text-lg text-gray-600">No hay modelo seleccionado</p>
      )}
      <div>
        <h2>Medicion</h2>
        <div className="mb-2">
            <label className="block text-sm">
              Sensor 1: <span>{sensorData}</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm">
              Sensor 2: <span>{sensorData2}</span>
            </label>
          </div>
      </div>
    </div>
  );
};

export default ModelChange;
