import { createContext, useContext, useState } from "react";

// Crear el contexto para los modelos
const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedSensor1, setSelectedSensor1] = useState("");
  const [selectedSensor2, setSelectedSensor2] = useState("");
  const [models, setModels] = useState([
    { name: "Front LH", sensors: [] },
    { name: "Front RH", sensors: [] },
    { name: "Rear LH", sensors: [] },
    { name: "Rear RH", sensors: [] },
    { name: "Model X LH", sensors: [] },
    { name: "Model X RH", sensors: [] },
  ]);
  
  const [sensors, setSensors] = useState([
    // Lista de sensores inicial, puedes agregar más sensores por defecto
    { name: "Sensor 600mm", mm: "600" },
    { name: "Sensor 1500mm", mm: "1500" },
    { name: "Sensor 800mm", mm: "800" },
    { name: "Sensor 1000mm", mm: "1000" },
  ]);

  //funcion para cambiar el tamaño del sensor
  const changeSensorSize = (sensorName, sensorNumber) => {
    if (sensorNumber === 1) {
      setSelectedSensor1(sensorName);
    } else if (sensorNumber === 2) {
      setSelectedSensor2(sensorName);
    }
  };
  

  // Función para cambiar el modelo seleccionado
  const changeModel = (modelName) => {
    setSelectedModel(modelName);
  };

  return (
    <ModelContext.Provider
      value={{
        selectedModel,
        models,
        changeModel,
        sensors,
        changeSensorSize,
        selectedSensor1,
        setSelectedSensor1,
        selectedSensor2,
        setSelectedSensor2,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => useContext(ModelContext);
