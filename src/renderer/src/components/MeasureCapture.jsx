import marcoImage from "../assets/marco.jpeg";
import { useState, useEffect } from "react";
import { useModel } from "../context/modelContext";

export default function MeasureCapture() {
  const [sensorData, setSensorData] = useState("Cargando...");
  const [sensorData2, setSensorData2] = useState("Cargando...");
  const { selectedSensor1, selectedSensor1Port, selectedSensor2, selectedSensor2Port } = useModel();
  const [zero, setZero] = useState(0);
  const [accumulatedZero, setAccumulatedZero] = useState(0);
  const [zero2, setZero2] = useState(0);
  const [accumulatedZero2, setAccumulatedZero2] = useState(0);

  // Función para leer los sensores
  const handleReadSensor = () => {

    //sensor 1
    window.api
      .readSensor(selectedSensor1Port, selectedSensor1, accumulatedZero)
      .then((data) => {
        if (data.startsWith("Error:")) {
          setSensorData("Error");
          console.log(data);
        } else {
          setSensorData(data);
          console.log("datos sensor 1", data);
        }
      })
      .catch(() => setSensorData("Error al comunicarse con el sensor"));

    //sensor 2
    window.api
      .readSensor(selectedSensor2Port, selectedSensor2, accumulatedZero2)
      .then((data) => {
        if (data.startsWith("Error:")) {
          setSensorData2("Error");
        } else {
          setSensorData2(data);
          console.log("datos sensor 2", data);
        }
      })
      .catch(() => setSensorData2("Error al comunicarse con el sensor"));
  };

  // Función para marcar un nuevo "cero" (referencia)
  const handleSetZero = () => {
    const parsedZero = parseFloat(sensorData);
    if (!isNaN(parsedZero)) {
      setAccumulatedZero(accumulatedZero + parsedZero); // Acumula los valores de cero
      setZero(parsedZero); // Solo guarda el último ajuste como referencia
      console.log("Nuevo acumulado de zero:", accumulatedZero + parsedZero);
    } else {
      console.log(
        "Error: el valor del sensor no es un número válido",
        sensorData,
      );
    }
  };

  // Función para marcar un nuevo "cero" (referencia)
  const handleSetZero2 = () => {
    const parsedZero2 = parseFloat(sensorData2);
    if (!isNaN(parsedZero2)) {
      setAccumulatedZero2(accumulatedZero2 + parsedZero2); // Acumula los valores de cero
      setZero(parsedZero2); // Solo guarda el último ajuste como referencia
      console.log("Nuevo acumulado de zero:", accumulatedZero2 + parsedZero2);
    } else {
      console.log(
        "Error: el valor del sensor no es un número válido",
        sensorData2,
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleReadSensor();
    }, 500);

    return () => clearInterval(interval);
  }, [zero, zero2]); // <-- Se ejecuta nuevamente si `zero` cambia

  return (
    <div className="h-full flex flex-col p-4 bg-white rounded-lg shadow-lg">
      {/* Título */}
      <h2 className="text-lg font-semibold mb-2">Medición</h2>

      <div className="flex flex-grow">
        {/* Área de medición con scroll (ocupa todo el espacio disponible) */}
        <div className="relative flex-1 h-96 bg-gray-300 rounded-lg overflow-hidden border">
          {/* Imagen de fondo */}
          <img
            src={marcoImage}
            alt="Marco"
            className="w-full h-full rounded-lg shadow-md "
          />

          {/* Cuadros de texto superpuestos */}
          <div className="absolute top-12 left-1/2 bg-white p-2 rounded shadow-md">
            {sensorData}
          </div>
          <div className="absolute top-28 left-3/4 bg-white p-2 rounded shadow-md">
            {sensorData2}
          </div>
        </div>

        {/* Panel derecho */}
        <div className="w-1/4 ml-4 flex flex-col">
          {/* Botones */}
          <div className="flex flex-col space-y-2 flex-grow">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex-grow">
              ✅ Capturar
            </button>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex-grow">
              📏 Medir
            </button>
            <button
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex-grow"
              onClick={handleSetZero} // Aquí llamas la función para establecer el "cero"
            >
              🔄 Establecer Cero Sensor 1
            </button>
            <button
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex-grow"
              onClick={handleSetZero2} // Aquí llamas la función para establecer el "cero"
            >
              🔄 Establecer Cero Sensor 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
