import { useState } from "react"; from "react";
import { useModel } from "../context/modelContext"; // Importa el contexto de modelos

const ModelChange = () => {
  const { selectedModel, models } = useModel(); // Obtiene el modelo seleccionado desde el contexto
  const [sensorData, setSensorData] = useState("Cargando...");
  const [sensorData2, setSensorData2] = useState("Cargando...");
  

  // Busca el modelo activo en la lista de modelos
  const activeModel = models.find((model) => model.name === selectedModel);

  return (
    <div className="w-full mx-auto p-6 h-80 bg-white rounded-lg shadow-lg flex flex-col justify-between">
      <h2 className="text-xl font-semibold text-gray-800">Modelo Actual</h2>
      {activeModel ? (
        <div className="mt-4">
          <p className="text-lg text-gray-600">Nombre: {activeModel.name}</p>
          <p className="text-lg text-gray-600">Sensores: {activeModel.sensors}</p>
          <p className="text-lg text-gray-600">Medidas por Sensor: {activeModel.measurements}</p>
        </div>
      ) : (
        <p className="text-lg text-gray-600">No hay modelo seleccionado</p>
      )}
    </div>
  );
};

export default ModelChange;
