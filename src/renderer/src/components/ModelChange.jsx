import { useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa"; // Usando estos íconos de react-icons

const ModelChange = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [isActive, setIsActive] = useState(false);

  const models = [
    "Front LH",
    "Front RH",
    "Rear LH",
    "Rear RH",
    "Model X LH",
    "Model X RH",
  ];

  const handleActivate = () => {
    setIsActive(true);
  };

  const handleDeactivate = () => {
    setIsActive(false);
  };

  // Función para separar el modelo en dos partes: en negrita "Front" y en normal "LH"
  const formatModel = (model) => {
    const [firstPart, secondPart] = model.split(" ");
    return (
      <span>
        <strong>{firstPart}</strong> {secondPart}
      </span>
    );
  };

  return (
    <div className="w-full h-full mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between">
      <h2 className="text-xl font-semibold text-gray-800">Modelo Actual</h2>

      <div>
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700"
        >
          Seleccionar Modelo
        </label>
        <select
          id="model"
          className="mt-1 block w-full p-2 bg-white border-none appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="">--Selecciona un modelo--</option>
          {models.map((model, index) => (
            <option key={index} value={model}>
              {formatModel(model)}
            </option>
          ))}
        </select>
      </div>

      {/* Espacio reservado para el mensaje para evitar que el tamaño del componente cambie */}
      <div className="h-6 flex items-center justify-center">
        {selectedModel && (
          <p className="text-green-500 text-sm">Cargado correctamente</p>
        )}
      </div>

      <div className="flex justify-between space-x-4">
        <button
          className={`flex flex-col items-center justify-center w-full h-20 rounded-lg ${
            isActive
              ? "bg-blue-500 text-white hover:bg-blue-400 cursor-not-allowed"
              : "bg-white text-black border border-black hover:bg-gray-200"
          }`}
          onClick={handleActivate}
          disabled={isActive}
        >
          <FaPlay className="mb-1 text-2xl" />
          Activar
        </button>
        <button
          className={`flex flex-col items-center justify-center w-full h-20 rounded-lg ${
            isActive
              ? "bg-white text-black border border-black hover:bg-gray-200"
              : "bg-red-500 text-white hover:bg-red-400"
          }`}
          onClick={handleDeactivate}
        >
          <FaPause className="mb-1 text-2xl" />
          Desactivar
        </button>
      </div>
    </div>
  );
};

export default ModelChange;
