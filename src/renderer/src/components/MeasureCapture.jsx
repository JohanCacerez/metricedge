import { useState, useEffect } from "react";
import { useModel } from "../context/modelContext";
import { useUser } from "../context/UserContext"; // Ajusta la ruta si es diferente


export default function MeasureCapture() {
  const { selectedSensor1, selectedSensor1Port, selectedSensor2, selectedSensor2Port, selectedModel } = useModel();
  const { user } = useUser();


  const modelMeasurementCount = {
    "Front LH": 3,
    "Front RH": 3,
    "Rear LH": 4,
    "Rear RH": 4,
  };

  const sensorAssignment = {
    "Front LH": [0, 0, 0],
    "Front RH": [0, 0, 0],
    "Rear LH": [0, 0, 0, 1], // últimos index por sensor 2
    "Rear RH": [0, 0, 0, 1],
  };

  const measurementPositions = {
    "Front LH": [
      { top: "40%", left: "32%" },
      { top: "42%", left: "72%" },
      { top: "25%", left: "50%" },
    ],
    "Front RH": [
      { top: "40%", left: "62%" },
      { top: "42%", left: "20%" },
      { top: "25%", left: "40%" },
    ],
    "Rear LH": [
      { top: "37%", left: "27%" },
      { top: "37%", left: "63%" },
      { top: "20%", left: "45%" },
      { top: "40%", left: "75%" },
    ],
    "Rear RH": [
      { top: "37%", left: "66%" },
      { top: "37%", left: "30%" },
      { top: "20%", left: "45%" },
      { top: "38%", left: "14%" },
    ],
  };

  const [capturedMeasurements, setCapturedMeasurements] = useState([]);
  const [accumulatedZero, setAccumulatedZero] = useState([0, 0, 0, 0]);
  const [currentMeasurementIndex, setCurrentMeasurementIndex] = useState(0);
  const [sensorValues, setSensorValues] = useState(["Cargando...", "Cargando...", "Cargando...", "Cargando..."]);

  // Leer el sensor específico
  const handleMeasure = async () => {
    const positionCount = modelMeasurementCount[selectedModel];
    if (currentMeasurementIndex >= positionCount) return;

    const sensorIndex = sensorAssignment[selectedModel][currentMeasurementIndex];
    const sensor = sensorIndex === 0 ? selectedSensor1 : selectedSensor2;
    const port = sensorIndex === 0 ? selectedSensor1Port : selectedSensor2Port;

    try {
      const data = await window.api.readSensor(port, sensor, accumulatedZero[sensorIndex]);
      if (!data.startsWith("Error")) {
        const parsed = parseFloat(data);
        if (!isNaN(parsed)) {
          setCapturedMeasurements((prev) => {
            const updated = [...prev];
            updated[currentMeasurementIndex] = parsed;
            return updated;
          });
          setCurrentMeasurementIndex((prev) => prev + 1);
        }
      }
    } catch (err) {
      console.error("Error leyendo sensor:", err);
    }
  };

  const handleSetZero = (index) => {
    const parsedValue = parseFloat(sensorValues[index]);
    if (!isNaN(parsedValue)) {
      setAccumulatedZero((prev) => {
        const newZero = [...prev];
        newZero[index] += parsedValue;
        return newZero;
      });
    }
  };

  // Actualiza constantemente los valores en tiempo real (si se quiere mostrarlo en algún lado)
  useEffect(() => {
    const interval = setInterval(() => {
      [selectedSensor1, selectedSensor2].forEach((sensor, index) => {
        window.api
          .readSensor(index === 0 ? selectedSensor1Port : selectedSensor2Port, sensor, accumulatedZero[index])
          .then((data) => {
            setSensorValues((prev) => {
              const updated = [...prev];
              updated[index] = data.startsWith("Error") ? "Error" : data;
              return updated;
            });
          });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [accumulatedZero]);

  const modelDataReady =
    currentMeasurementIndex === modelMeasurementCount[selectedModel];

    const finalArray = [user?.id || "UsuarioDesconocido", selectedModel, ...capturedMeasurements];


  const handleReset = () => {
    setCapturedMeasurements([]);
    setCurrentMeasurementIndex(0);
  };

  const handleSave = async () => {
    const dataArray = [user?.id || "UsuarioDesconocido", selectedModel, ...capturedMeasurements];
    const result = await window.api.createMeasurement(dataArray);
    if (result.success) {
      alert(`Medición guardada con ID: ${result.measurementId}`);
      handleReset();
    } else {
      alert(`Error al guardar la medición: ${result.message}`);
    }
  }
  

  return (
    <div className="h-full flex flex-col p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Medición</h2>
      <div className="flex flex-grow">
        <div className="relative flex-1 h-96 bg-gray-300 rounded-lg overflow-hidden border">
          <img
            src={new URL(`../assets/${selectedModel}.jpeg`, import.meta.url).href}
            alt="Modelo"
            className="w-full h-full rounded-lg shadow-md"
          />
          {measurementPositions[selectedModel]?.map((pos, index) => (
            <div
              key={index}
              className={`absolute p-2 rounded shadow-md transition-all duration-300 ${
                index === currentMeasurementIndex
                  ? "bg-yellow-200 font-bold"
                  : "bg-white"
              }`}
              style={{ top: pos.top, left: pos.left }}
            >
              {capturedMeasurements[index] !== undefined
  ? capturedMeasurements[index]
  : index === currentMeasurementIndex
    ? sensorValues[sensorAssignment[selectedModel][index]]
    : "---"}
            </div>
          ))}
        </div>

        <div className="w-1/4 ml-4 flex flex-col h-full">
          <div className="flex flex-col space-y-2 flex-grow justify-between">
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex-grow"
              disabled={!modelDataReady}
              onClick={handleSave}
            >
              ✅ Guardar
            </button>
            <button
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex-grow"
              onClick={handleMeasure}
              disabled={modelDataReady}
            >
              📏 Medir
            </button>

            {/* Botones de Cero */}
            {(selectedModel === "Front LH" || selectedModel === "Front RH") && (
              <button
                className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex-grow"
                onClick={() => handleSetZero(0)}
              >
                🔄 Establecer Cero
              </button>
            )}

            {(selectedModel === "Rear LH" || selectedModel === "Rear RH") && (
              <>
                <button
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex-grow"
                  onClick={() => handleSetZero(0)}
                >
                  🔄 Establecer Cero Sensor 1
                </button>
                <button
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex-grow"
                  onClick={() => handleSetZero(1)}
                >
                  🔄 Establecer Cero Sensor 2
                </button>
              </>
            )}

<button
  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex-grow"
  onClick={handleReset}
>
  ♻️ Reiniciar
</button>

          </div>
        </div>
      </div>

      {/* Muestra final de los datos cuando ya se midieron todas las posiciones */}
      {modelDataReady && (
        <div className="mt-4 p-3 border rounded bg-gray-100 text-sm font-mono">
          📦 Datos listos para guardar:{" "}
          <span className="text-green-700 font-bold">
            {JSON.stringify(finalArray)}
          </span>
        </div>
      )}
    </div>
  );
}
