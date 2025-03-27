import React, { useState, useEffect } from "react";
import { useModel } from "../../context/modelContext"; // Importa el contexto de modelos

const ControlModelModal = ({ closeModal }) => {
  const { models, addModel, deleteModel, editModel, changeModel } = useModel();
  const [newName, setNewName] = useState("");
  const [newSensors, setNewSensors] = useState(1); // Número de sensores
  const [sensorMeasurements, setSensorMeasurements] = useState([10]); // Medidas por sensor, inicialmente con 1 sensor
  const [editName, setEditName] = useState("");
  const [editNewName, setEditNewName] = useState("");
  const [editNewSensors, setEditNewSensors] = useState(1);
  const [editSensorMeasurements, setEditSensorMeasurements] = useState([10]);

  // Actualiza el número de sensores y ajusta las medidas por sensor
  useEffect(() => {
    if (newSensors === 1) {
      setSensorMeasurements([10]); // Solo 1 medida para 1 sensor
    } else if (newSensors === 2) {
      setSensorMeasurements([5, 5]); // Asignar medidas iguales para 2 sensores, esto puede ajustarse
    }
  }, [newSensors]);

  useEffect(() => {
    if (editNewSensors === 1) {
      setEditSensorMeasurements([10]);
    } else if (editNewSensors === 2) {
      setEditSensorMeasurements([5, 5]);
    }
  }, [editNewSensors]);

  const handleAddModel = () => {
    if (newName && newSensors && sensorMeasurements) {
      addModel(newName, newSensors, sensorMeasurements);
      setNewName("");
      setNewSensors(1);
      setSensorMeasurements([10]);
    }
  };

  const handleDeleteModel = (name) => {
    deleteModel(name);
  };

  const handleEditModel = () => {
    if (editName && editNewName) {
      editModel(editName, editNewName, editNewSensors, editSensorMeasurements);
      setEditName("");
      setEditNewName("");
      setEditNewSensors(1);
      setEditSensorMeasurements([10]);
    }
  };

  const handleModelSelection = (e) => {
    changeModel(e.target.value); // Cambiar el modelo activo
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
      onClick={handleClickOutside}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-[80vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 text-xl">
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Control de Modelos</h2>

        {/* Contenedor flex para las secciones */}
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">

          {/* Cambiar Modelo */}
          <div className="flex-1 p-4 border border-gray-300 rounded-lg h-[400px] w-[250px]">
            <h3 className="text-lg">Cambiar Modelo Activo</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              onChange={handleModelSelection}
            >
              <option value="">--Selecciona un modelo--</option>
              {models.map((model, index) => (
                <option key={index} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          {/* Crear Modelo */}
          <div className="flex-1 p-4 border border-gray-300 rounded-lg h-[400px] w-[250px]">
            <h3 className="text-lg">Crear Modelo</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Nombre del modelo"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <label>Cantidad de sensores</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Cantidad de sensores"
              value={newSensors}
              onChange={(e) => setNewSensors(Number(e.target.value))}
              min={1}
              max={2}
            />
            {newSensors === 1 ? (
              <>
                <label>Medidas sensor 1</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Medidas por sensor"
                  value={sensorMeasurements[0]}
                  onChange={(e) => setSensorMeasurements([Number(e.target.value)])}
                />
              </>
            ) : (
              <>
                <label>Medidas sensor 1</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Medidas para Sensor 1"
                  value={sensorMeasurements[0]}
                  onChange={(e) => setSensorMeasurements([Number(e.target.value), sensorMeasurements[1]])}
                />
                <label>Medidas sensor 2</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Medidas para Sensor 2"
                  value={sensorMeasurements[1]}
                  onChange={(e) => setSensorMeasurements([sensorMeasurements[0], Number(e.target.value)])}
                />
              </>
            )}
            <button onClick={handleAddModel} className="bg-blue-500 text-white w-full py-2 rounded-lg">
              Crear Modelo
            </button>
          </div>

          {/* Eliminar Modelo */}
          <div className="flex-1 p-4 border border-gray-300 rounded-lg h-[400px] w-[250px]">
            <h3 className="text-lg">Eliminar Modelo</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              onChange={(e) => handleDeleteModel(e.target.value)}
            >
              <option value="">--Selecciona un modelo--</option>
              {models.map((model, index) => (
                <option key={index} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleDeleteModel(editName)}
              className="bg-red-500 text-white w-full py-2 rounded-lg"
            >
              Eliminar Modelo
            </button>
          </div>

          {/* Editar Modelo */}
          <div className="flex-1 p-4 border border-gray-300 rounded-lg h-[400px] w-[250px]">
            <h3 className="text-lg">Editar Modelo</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              onChange={(e) => setEditName(e.target.value)}
            >
              <option value="">--Selecciona un modelo--</option>
              {models.map((model, index) => (
                <option key={index} value={model.name}>
                  {model.name}
                </option>
              ))}
            </select>
            {editName && (
              <>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Nuevo nombre del modelo"
                  value={editNewName}
                  onChange={(e) => setEditNewName(e.target.value)}
                />
                <label>Cantidad de sensores</label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                  placeholder="Cantidad de sensores"
                  value={editNewSensors}
                  onChange={(e) => setEditNewSensors(Number(e.target.value))}
                />
                {editNewSensors === 1 ? (
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md mb-2"
                    placeholder="Medidas por sensor"
                    value={editSensorMeasurements[0]}
                    onChange={(e) => setEditSensorMeasurements([Number(e.target.value)])}
                  />
                ) : (
                  <>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md mb-2"
                      placeholder="Medidas para Sensor 1"
                      value={editSensorMeasurements[0]}
                      onChange={(e) =>
                        setEditSensorMeasurements([Number(e.target.value), editSensorMeasurements[1]])
                      }
                    />
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md mb-2"
                      placeholder="Medidas para Sensor 2"
                      value={editSensorMeasurements[1]}
                      onChange={(e) =>
                        setEditSensorMeasurements([editSensorMeasurements[0], Number(e.target.value)])
                      }
                    />
                  </>
                )}
                <button onClick={handleEditModel} className="bg-yellow-500 text-white w-full py-2 rounded-lg">
                  Editar Modelo
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={closeModal} className="bg-gray-500 text-white py-2 px-4 rounded-lg">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlModelModal;
