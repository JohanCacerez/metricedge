import { useState } from "react";
import ControlModelModal from "../components/modals/ControlModelModal";
import UserModal from "../components/modals/UserManagementModal"; // Importa el nuevo modal

const ControlPanel = () => {
  const [showModelModal, setShowModelModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const buttons = [
    { label: "Control de Usuarios", action: () => setShowUserModal(true) },
    { label: "Control de Modelos", action: () => setShowModelModal(true) },
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

      {showModelModal && <ControlModelModal closeModal={() => setShowModelModal(false)} />}
      {showUserModal && <UserModal isOpen={showUserModal} onClose={() => setShowUserModal(false)} />}

    </div>
  );
};

export default ControlPanel;
