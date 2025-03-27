import { useEffect, useState } from "react";

export default function MeasureCapture() {
  const [sensorData, setSensorData] = useState("Cargando...");
  const [sensorData2, setSensorData2] = useState("Cargando...");

  const handleReadSensor = () => {
    window.api.readSensor()
      .then((data) => {
        if (data.startsWith("Error:")) {
          setSensorData("Error al leer el sensor");
        } else {
          setSensorData(data);
        }
      })
      .catch(() => setSensorData("Error al comunicarse con el sensor"));

    window.api.readSensor2()
      .then((data) => {
        if (data.startsWith("Error:")) {
          setSensorData2("Error al leer el sensor");
        } else {
          setSensorData2(data);
        }
      })
      .catch(() => setSensorData2("Error al comunicarse con el sensor"));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleReadSensor();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col p-4 bg-white rounded-lg shadow-lg">
      {/* Título */}
      <h2 className="text-lg font-semibold mb-2">Medición</h2>

      <div className="flex flex-grow">
        {/* Área de medición con scroll (ocupa todo el espacio disponible) */}
        <div className="flex-1 h-full bg-gray-300 rounded-lg overflow-y-auto p-2 border">
          {/* Contenido interno del área de medición */}
        </div>

        {/* Panel derecho */}
        <div className="w-1/4 ml-4 flex flex-col">
          {/* Entradas de los sensores */}
          <div className="mb-2">
            <label className="block text-sm">Sensor 1: <span>{sensorData}</span></label>
          </div>
          <div className="mb-4">
            <label className="block text-sm">Sensor 2: <span>{sensorData2}</span></label>
          </div>

          {/* Botones */}
          <div className="flex flex-col space-y-2 flex-grow">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 flex-grow">
              ✅ Capturar
            </button>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex-grow">
              📏 Medir
            </button>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 flex-grow">
              🔄 Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
