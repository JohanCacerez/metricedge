import { useModel } from "../context/modelContext"; // Importa el contexto de modelos
const ModelChange = () => {
  const {
    selectedModel,
    models,
    selectedSensor1,
    selectedSensor2,
    selectedSensor1Port,
    selectedSensor2Port,
    device1,
    device2,
  } = useModel();
  const activeModel = models.find((model) => model.name === selectedModel);



  return (
    <div className="w-full mx-auto p-6 h-80 bg-white rounded-lg shadow-lg flex flex-col justify-between">
      <h2 className="text-xl font-semibold text-gray-800">Modelo Actual</h2>
      {activeModel ? (
        <div className="mt-4">
          <p className="text-lg text-gray-600">Nombre: {activeModel.name}</p>
          <p className="text-lg text-gray-600">
            Sensor 1: {selectedSensor1} ({selectedSensor1Port}) Dev {device1}
          </p>
          <p className="text-lg text-gray-600">
            Sensor 2: {selectedSensor2} ({selectedSensor2Port} Dev {device2}
          </p>
        </div>
      ) : (
        <p className="text-lg text-gray-600">No hay un modelo activo.</p>
      )}
    </div>
  );
};

export default ModelChange;
