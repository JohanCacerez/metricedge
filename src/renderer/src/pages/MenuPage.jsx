import { useUser } from "../context/UserContext"; // Asegúrate de importar el contexto
import ModelChange from "../components/ModelChange";
import MeasurementHistory from "../components/MeasurementHistory";
import MeasureCapture from "../components/MeasureCapture";

export default function MenuPage() {
  const { user } = useUser(); // Obtiene el usuario desde el contexto

  console.log(user)

  if (!user) {
    return (
      <div className="flex flex-col space-y-2 h-full">
        <p className="text-center text-lg">Por favor, inicie sesión para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 h-full">
      {/* Primera fila con ModelChange y MeasurementHistory */}
      <div className="flex">
        <div className="w-1/2 pr-2">
          <ModelChange />
        </div>
        <div className="w-1/2 pl-2">
          <MeasurementHistory />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <MeasureCapture />
      </div>
    </div>
  );
}
