import { useState, useEffect } from "react";
import { useMeasure } from "../context/MeasureContext";

export default function GraphPage() {
  const {
    setLSE, setLIE,
    Xmed, LSCXmed, LICXmed, Rmed,
    LSCRmed, s, CPK, CP, LSC, LIC
  } = useMeasure();

  const [valores, setValores] = useState({
    Xmed: null,
    LSCXmed: null,
    LICXmed: null,
    Rmed: null,
    LSCRmed: null,
    s: null,
    CPK: null,
    CP: null,
    LSC: null,
    LIC: null,
  });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = {
          Xmed: await Xmed(),
          LSCXmed: await LSCXmed(),
          LICXmed: await LICXmed(),
          Rmed: await Rmed(),
          LSCRmed: await LSCRmed(),
          s: await s(),
          CPK: await CPK(),
          CP: await CP(),
          LSC: await LSC(),
          LIC: await LIC(),
        };
        setValores(datos);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const mostrarValor = (valor) =>
    valor !== null && !isNaN(valor) ? valor.toFixed(2) : "Cargando...";

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      {/* Título principal */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Gráfica de Control</h1>
        <p className="text-center text-gray-600">Prueba de datos</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-4">
          <p><strong>X̄:</strong> {mostrarValor(valores.Xmed)}</p>
          <p><strong>LSC X̄:</strong> {mostrarValor(valores.LSCXmed)}</p>
          <p><strong>LIC X̄:</strong> {mostrarValor(valores.LICXmed)}</p>
          <p><strong>R̄:</strong> {mostrarValor(valores.Rmed)}</p>
          <p><strong>LSC R̄:</strong> {mostrarValor(valores.LSCRmed)}</p>
          <p><strong>s:</strong> {mostrarValor(valores.s)}</p>
          <p><strong>CPK:</strong> {mostrarValor(valores.CPK)}</p>
          <p><strong>CP:</strong> {mostrarValor(valores.CP)}</p>
          <p><strong>LSC:</strong> {mostrarValor(valores.LSC)}</p>
          <p><strong>LIC:</strong> {mostrarValor(valores.LIC)}</p>
        </div>
      </div>

      {/* Sección de frecuencia y nombre */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-xl shadow">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 flex justify-center">Longitud total</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-4">
          <div>
            <h3 className="text-md text-gray-600">Frecuencia</h3>
            <h3 className="text-md text-gray-600">5pz p/turno</h3>
          </div>
        </div>
      </div>

      {/* Datos técnicos */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow">
        <div>
          <h3 className="text-sm text-gray-500">Departamento</h3>
          <p className="font-medium">Finishing</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">MAQ. No</h3>
          <p className="font-medium">123456</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">No de parte</h3>
          <p className="font-medium">123456</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">OP No</h3>
          <p className="font-medium">123456</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Característica</h3>
          <p className="font-medium">Longitud total</p>
        </div>
      </div>

      {/* Datos de calidad */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow">
        <div>
          <h3 className="text-sm text-gray-500">CP</h3>
          <p className="font-medium">{mostrarValor(valores.CP)}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">CPK</h3>
          <p className="font-medium">{mostrarValor(valores.CPK)}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Nombre de la parte</h3>
          <p className="font-medium">123456</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Nombre de operación</h3>
          <p className="font-medium">Finishing</p>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-sm text-gray-500 mb-2">Especificación</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 text-sm mb-1">LSE</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => setLSE(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">LIE</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={(e) => setLIE(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
