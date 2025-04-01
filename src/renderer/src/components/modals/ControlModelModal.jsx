import { useModel } from "../../context/modelContext";
import PropTypes from "prop-types";

const ControlModelModal = ({ closeModal }) => {
  const { models, changeModel } = useModel();

  const handleModelSelection = (e) => {
    changeModel(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center" onClick={closeModal}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Activar modelo</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleModelSelection}
            >
              <option value="">--Selecciona un modelo--</option>
              {models.map((model, index) => (
                <option key={index} value={model.name}>{model.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

ControlModelModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ControlModelModal;
