import { useModel } from "../../context/modelContext";
import PropTypes from "prop-types";
import { useState } from "react";

const ControlModelModal = ({ closeModal }) => {
  const { models, changeModel, sensors, changeSensorSize } = useModel();
  const [selectedSensor1, setSelectedSensor1] = useState("");
  const [selectedSensor2, setSelectedSensor2] = useState("");

  const handleModelSelection = (e) => {
    changeModel(e.target.value);
  };

  const handleSensor1Change = (e) => {
    setSelectedSensor1(e.target.value);
  };

  const handleSensor2Change = (e) => {
    setSelectedSensor2(e.target.value);
  };

  const handleActivate = (e) => {
    e.preventDefault();
    if (selectedSensor1) {
      const sensor = sensors.find((s) => s.name === selectedSensor1);
      if (sensor) changeSensorSize(sensor.name, 1);
    }
    if (selectedSensor2) {
      const sensor = sensors.find((s) => s.name === selectedSensor2);
      if (sensor) changeSensorSize(sensor.name, 2);
    }
    closeModal();
  };
  
  

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Activar modelo
        </h2>

        <form className="space-y-4" onSubmit={handleActivate}>
          <label>Seleccionar modelo</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleModelSelection}
          >
            <option value="">--Selecciona un modelo--</option>
            {models.map((model, index) => (
              <option key={index} value={model.name}>
                {model.name}
              </option>
            ))}
          </select>

          <div>
            <label>Tamaño del sensor 1:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSensor1}
              onChange={handleSensor1Change}
            >
              <option value="">--Selecciona el sensor--</option>
              {sensors.map((sensor, index) => (
                <option key={index} value={sensor.name}>
                  {sensor.name} ({sensor.mm}mm)
                </option>
              ))}
            </select>

            <label>Tamaño del sensor 2:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSensor2}
              onChange={handleSensor2Change}
            >
              <option value="">--Selecciona el sensor--</option>
              {sensors.map((sensor, index) => (
                <option key={index} value={sensor.name}>
                  {sensor.name} ({sensor.mm}mm)
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center m-4">
            <button
              className="bg-green-500 p-4 rounded-lg text-white font-bold"
              type="submit"
            >
              Activar
            </button>
          </div>
        </form>

        <div className="flex justify-end mt-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

ControlModelModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ControlModelModal;
