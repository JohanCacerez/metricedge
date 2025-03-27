import ModelChange from "../components/ModelChange";
import MeasurementHistory from "../components/MeasurementHistory";
import MeasureCapture from "../components/MeasureCapture";

export default function MenuPage() {
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

      {/* Segunda fila con MeasureCapture ocupando todo el ancho */}
      <div>
        <MeasureCapture />
      </div>
    </div>
  );
}
