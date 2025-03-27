import { createContext, useContext, useState } from "react";

// Crear el contexto para los modelos
const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [models, setModels] = useState([
    // Lista de modelos inicial, puedes agregar más modelos por defecto
    { name: "Front LH", sensors: 1, measurements: 10 },
    { name: "Front RH", sensors: 2, measurements: 15 },
  ]);

  // Función para cambiar el modelo seleccionado
  const changeModel = (modelName) => {
    setSelectedModel(modelName);
  };

  // Función para agregar un nuevo modelo
  const addModel = (name, sensors, measurements) => {
    setModels((prevModels) => [
      ...prevModels,
      { name, sensors, measurements },
    ]);
  };

  // Función para eliminar un modelo
  const deleteModel = (modelName) => {
    setModels((prevModels) => prevModels.filter((model) => model.name !== modelName));
    if (selectedModel === modelName) {
      setSelectedModel(""); // Limpiar el modelo seleccionado si se elimina
    }
  };

  // Función para editar un modelo
  const editModel = (oldName, newName, newSensors, newMeasurements) => {
    setModels((prevModels) =>
      prevModels.map((model) =>
        model.name === oldName
          ? { name: newName, sensors: newSensors, measurements: newMeasurements }
          : model
      )
    );
  };

  return (
    <ModelContext.Provider
      value={{
        selectedModel,
        models,
        changeModel,
        addModel,
        deleteModel,
        editModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => useContext(ModelContext);
