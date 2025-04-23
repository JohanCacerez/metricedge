import { HashRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import Navbar from "./components/Navbar";
import { UserProvider } from './context/UserContext';
import { ModelProvider } from './context/modelContext'; // Importa el ModelProvider
import { MeasureProvider } from './context/MeasureContext'; // Importa el MeasureProvider
import ControlPanel from "./pages/ControlPanel";
import GraphPage from "./pages/GraphPage";

function App() {
  return (
    <HashRouter>
      <UserProvider>
        <ModelProvider> {/* Envuelve toda la aplicación con ModelProvider */}
          <MeasureProvider> {/* Envuelve toda la aplicación con MeasureProvider */}
          <div className="flex">
            <Navbar />
            <div className="flex-1 p-2 bg-gray_light">
              <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/controlpanel" element={<ControlPanel />} />
                <Route path="/measure" element={<GraphPage />} />
                <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
              </Routes>
            </div>
          </div>
          </MeasureProvider>
        </ModelProvider>
      </UserProvider>
    </HashRouter>
  );
}

export default App;
