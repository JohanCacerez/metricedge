import { HashRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [user] = useState({
    name: "Juan Pérez",
    id: "12345",
    photo: "/assets/perfil.jpg",
  });

  // Función para cerrar sesión
  const handleLogout = () => {
    console.log("Cerrando sesión...");
    // Aquí podrías agregar lógica para cerrar sesión
  };
  return (
    <HashRouter>
      <div className="flex">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="flex-1 bg-gray_light">
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
