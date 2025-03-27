import React, { useState } from "react";

const ControlPanel = () => {
  const [showModal, setShowModal] = useState(false);
  const [modelData, setModelData] = useState({
    name: "",
    sensors: 1,
    measurements: 1,
  });

  const buttons = [
    { label: "Control de Usuarios", action: () => console.log("Usuarios") },
    { label: "Control de Modelos", action: () => setShowModal(true) },
    { label: "Control de Base de Datos", action: () => console.log("Base de Datos") },
  ];

  const handleChange = (e) => {
    setModelData({ ...modelData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Panel de Control</h2>
        <div className="flex flex-col gap-4">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.action}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition text-lg"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Configurar Modelo</h3>

            <label className="block mb-2">
              Nombre del Modelo:
              <input
                type="text"
                name="name"
                value={modelData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            <label className="block mb-2">
              Sensores:
              <select
                name="sensors"
                value={modelData.sensors}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              >
                <option value="1">1 Sensor</option>
                <option value="2">2 Sensores</option>
              </select>
            </label>

            <label className="block mb-4">
              Medidas por Sensor:
              <input
                type="number"
                name="measurements"
                value={modelData.measurements}
                min="1"
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              />
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  console.log("Modelo Guardado:", modelData);
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
