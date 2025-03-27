import { HashRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import Navbar from "./components/Navbar";
import {UserProvider} from './context/UserContext'
import ControlPanel from "./pages/ControlPanel";

function App() {
  return (
    <HashRouter>
      <UserProvider>
      <div className="flex">
        <Navbar />
        <div className="flex-1 p-2 bg-gray_light">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/controlpanel" element={<ControlPanel />} />
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
          </Routes>
        </div>
      </div>
      </UserProvider>
    </HashRouter>
  );
}

export default App;
