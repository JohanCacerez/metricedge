import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MeasurementHistory = () => {
  const [data, setData] = useState({
    labels: [], // Eje X (tiempo)
    datasets: [
      {
        label: "Mediciones",
        data: [], // Eje Y (valores de medición)
        fill: false,
        borderColor: "#007bff",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    // Simular la actualización de datos cada segundo
    const interval = setInterval(() => {
      const value = Math.floor(Math.random() * 601); // Valor aleatorio entre 0 y 600 mm
      const timestamp = new Date().toLocaleTimeString(); // Usar hora como etiqueta

      setData((prevData) => {
        const updatedLabels = [...prevData.labels, timestamp];
        const updatedData = [...prevData.datasets[0].data, value];

        // Limitar la cantidad de puntos mostrados en el gráfico (por ejemplo, solo los últimos 10)
        if (updatedLabels.length > 10) {
          updatedLabels.shift();
          updatedData.shift();
        }

        return {
          ...prevData,
          labels: updatedLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
          ],
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mx-auto p-6 h-auto bg-white rounded-lg shadow-lg">
      

      {/* Gráfico de líneas */}
      <div className=" h-72 w-full">
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Mediciones en Tiempo Real",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MeasurementHistory;
