import { useState, useEffect } from "react";
import { useModel } from "../context/modelContext";
import { useUser } from "../context/UserContext";

export default function MeasureCapture() {
  const {
    selectedSensor1,
    selectedSensor1Port,
    selectedSensor2,
    selectedSensor2Port,
    selectedModel,
    device1,
    device2,
  } = useModel();
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
    "Rear LH": [0, 0, 0, 1],
    "Rear RH": [0, 0, 0, 1],
  };

  const measurementPositions = {
    "Front LH": [
      { top: "42%", left: "72%" },
      { top: "42%", left: "32%" },
      { top: "42%", left: "20%" },
    ],
    "Front RH": [
      { top: "42%", left: "22%" },
      { top: "42%", left: "62%" },
      { top: "42%", left: "78%" },
    ],
    "Rear LH": [
      { top: "37%", left: "49%" },
      { top: "37%", left: "29%" },
      { top: "37%", left: "21%" },
      { top: "71%", left: "78%" },
    ],
    "Rear RH": [
      { top: "37%", left: "44%" },
      { top: "37%", left: "67%" },
      { top: "37%", left: "75%" },
      { top: "71%", left: "18%" },
    ],
  };

  const tolerances = {
    "Front LH": [
      { min: 10, max: 20 },
      { min: 5, max: 15 },
      { min: 8, max: 18 },
    ],
    "Front RH": [
      { min: 10, max: 20 },
      { min: 5, max: 15 },
      { min: 8, max: 18 },
    ],
    "Rear LH": [
      { min: 12, max: 22 },
      { min: 6, max: 16 },
      { min: 9, max: 19 },
      { min: 7, max: 17 },
    ],
    "Rear RH": [
      { min: 0, max: 700 },
      { min: 7, max: 17 },
      { min: 10, max: 20 },
      { min: 6, max: 16 },
    ],
  };

  const [capturedMeasurements, setCapturedMeasurements] = useState([]);
  const [accumulatedZero, setAccumulatedZero] = useState([0, 0, 0, 0]);
  const [currentMeasurementIndex, setCurrentMeasurementIndex] = useState(0);
  const [sensorValues, setSensorValues] = useState(["Cargando...", "Cargando...", "Cargando...", "Cargando..."]);
  const [lastValidValues, setLastValidValues] = useState(["0", "0", "0", "0"]);

  const handleMeasure = async () => {
    const positionCount = modelMeasurementCount[selectedModel];
    if (currentMeasurementIndex >= positionCount) return;

    const sensorIndex = sensorAssignment[selectedModel][currentMeasurementIndex];
    const sensor = sensorIndex === 0 ? selectedSensor1 : selectedSensor2;
    const port = sensorIndex === 0 ? selectedSensor1Port : selectedSensor2Port;

    try {
      const data = await window.api.readSensor(port, sensor, accumulatedZero[sensorIndex], device1);
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

  useEffect(() => {
    const interval = setInterval(() => {
      [selectedSensor1, selectedSensor2].forEach((sensor, index) => {
        window.api
          .readSensor(index === 0 ? selectedSensor1Port : selectedSensor2Port, sensor, accumulatedZero[index], device1)
          .then((data) => {
            setSensorValues((prev) => {
              const updated = [...prev];
              if (!data.startsWith("Error")) {
                updated[index] = data;
                setLastValidValues((last) => {
                  const newLast = [...last];
                  newLast[index] = data;
                  return newLast;
                });
              } else {
                updated[index] = lastValidValues[index]; // Usar última válida
              }
              return updated;
            });
          });
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [accumulatedZero, selectedSensor1, selectedSensor2, selectedSensor1Port, selectedSensor2Port, device1]);

  const modelDataReady = currentMeasurementIndex === modelMeasurementCount[selectedModel];
  const finalArray = [user?.id || "UsuarioDesconocido", selectedModel, ...capturedMeasurements];

  const handleReset = () => {
    setCapturedMeasurements([]);
    setCurrentMeasurementIndex(0);
  };

  const handleSave = async () => {
    const result = await window.api.createMeasurement(finalArray);
    if (result.success) {
      alert(`Medición guardada con ID: ${result.measurementId}`);
      handleReset();
    } else {
      alert(`Error al guardar la medición: ${result.message}`);
    }
  };

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
          {measurementPositions[selectedModel]?.map((pos, index) => {
            const value = capturedMeasurements[index];
            const isCurrent = index === currentMeasurementIndex;
            let bgColor = "bg-white";

            if (value !== undefined) {
              const { min, max } = tolerances[selectedModel][index];
              bgColor = value >= min && value <= max ? "bg-green-300" : "bg-red-400";
            } else if (isCurrent) {
              bgColor = "bg-yellow-200";
            }

            return (
              <div
                key={index}
                className={`absolute p-2 rounded shadow-md text-xs font-bold ${bgColor}`}
                style={{ top: pos.top, left: pos.left }}
              >
                {value !== undefined
                  ? value.toFixed(2)
                  : isCurrent
                    ? sensorValues[sensorAssignment[selectedModel][index]]
                    : "---"}
              </div>
            );
          })}
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
