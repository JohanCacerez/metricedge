import React, { useState } from "react";
import ControlModelModal from "../components/modals/ControlModelModal"; // Asegúrate de importar el modal

const ControlPanel = () => {
  const [showModal, setShowModal] = useState(false);

  const buttons = [
    { label: "Control de Usuarios", action: () => console.log("Usuarios") },
    { label: "Control de Modelos", action: () => setShowModal(true) },
    { label: "Control de Base de Datos", action: () => console.log("Base de Datos") },
  ];

  return (
    <div className="flex flex-col space-y-2 h-full">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Panel de Control</h2>
        <div className="flex flex-col gap-4">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.action}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {showModal && <ControlModelModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default ControlPanel;
