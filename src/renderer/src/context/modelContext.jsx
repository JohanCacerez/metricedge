import { createContext, useContext, useState } from "react";

// Crear el contexto para los modelos
const ModelContext = createContext();

export const ModelProvider = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState(() => {
    return localStorage.getItem("selectedModel") || "";
  });
  
  const [selectedSensor1, setSelectedSensor1] = useState(() => {
    return localStorage.getItem("selectedSensor1") || "";
  });
  const [selectedSensor2, setSelectedSensor2] = useState(() => {
    return localStorage.getItem("selectedSensor2") || "";
  });

  const [device1, setDevice1] = useState(() => {
    return localStorage.getItem("device1") || "";
  });
  const [device2, setDevice2] = useState(() => {
    return localStorage.getItem("device2") || "";
  });
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
    { name: "600"},
    { name: "1500"},
    { name: "800"},
    { name: "1000"},
  ]);

  const [portSensor, setPortSensor] = useState([
    { name: "COM1", port: "ai0" },
    { name: "COM2",port: "ai1" },
    { name: "COM3", port: "ai2" },
    { name: "COM4", port: "ai3" },
    { name: "COM5", port: "ai4" },
    { name: "COM6", port: "ai5" },
    { name: "COM7", port: "ai6" },
    { name: "COM8", port: "ai7" },
    { name: "COM9", port: "ai8" },
    { name: "COM10", port: "ai9" },
    { name: "COM11", port: "ai10" },
    { name: "COM12", port: "ai11" },
    { name: "COM13", port: "ai12" },
    { name: "COM14", port: "ai13" },
    { name: "COM15", port: "ai14" },
    { name: "COM16", port: "ai15" },
    { name: "COM17", port: "ai16" },
  ]);

  const [selectedSensor1Port, setSelectedSensor1Port] = useState(() => {
    return localStorage.getItem("selectedSensor1Port") || "";
  }
);
  const [selectedSensor2Port, setSelectedSensor2Port] = useState(() => {
    return localStorage.getItem("selectedSensor2Port") || "";
  }
);

  // Función para cambiar el puerto del sensor
  const changeSensorPort = (port, sensorNumber) => {
    if (sensorNumber === 1) {
      setSelectedSensor1Port(port);
      localStorage.setItem("selectedSensor1Port", port);
    } else if (sensorNumber === 2) {
      setSelectedSensor2Port(port);
      localStorage.setItem("selectedSensor2Port", port);
    }
  };

  //funcion para cambiar el tamaño del sensor
  const changeSensorSize = (sensorName, sensorNumber) => {
    if (sensorNumber === 1) {
      setSelectedSensor1(sensorName);
      localStorage.setItem("selectedSensor1", sensorName);
    } else if (sensorNumber === 2) {
      setSelectedSensor2(sensorName);
      localStorage.setItem("selectedSensor2", sensorName);
    }
  };

  // Función para cambiar el dispositivo
  const changeDevice = (deviceName,sensorNumber) => {
    if (sensorNumber === 1) {
      setDevice1(deviceName);
      localStorage.setItem("device1", deviceName);
    } else if (sensorNumber === 2) {
      setDevice2(deviceName);
      localStorage.setItem("device2", deviceName);
    }
  };

  // Función para cambiar el modelo seleccionado
  const changeModel = (modelName) => {
    setSelectedModel(modelName);
    localStorage.setItem("selectedModel", modelName);
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
        portSensor,
        setPortSensor,
        changeSensorPort,
        selectedSensor1Port,
        selectedSensor2Port,
        changeDevice,
        device1,
        device2,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => useContext(ModelContext);
