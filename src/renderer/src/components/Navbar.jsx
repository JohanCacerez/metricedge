import {
  FaHome,
  FaUserShield,
  FaSignOutAlt,
  FaSignInAlt,
  FaChartLine
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; // Importa useLocation
import { useState, useEffect } from "react";

import { useUser } from "../context/UserContext";

export default function Navbar() {
  const { user, updateUser } = useUser();
  const [isAuth, setIsAuth] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [credentials, setCredentials] = useState({ name: "", password: "" });

  const location = useLocation(); // Obtén la ubicación actual

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await window.api.loginUser(
        credentials.name,
        credentials.password,
      );
      if (response.success) {
        localStorage.setItem("token", response.token);
        setIsAuth(true);
        setModalOpen(false);
        updateUser(response.user);
      } else {
        alert(response.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    updateUser(null);
  };

  // Función para determinar si el enlace es el actual
  const isActive = (path) =>
    location.pathname === path ? "text-blue-500" : "text-gray";

  return (
    <div className="w-64 h-screen bg-white text-white flex flex-col">
      <div className="py-4 text-center text-xl font-bold text-dark">
        MetricEdge
      </div>

      <div className="flex items-center gap-3 p-4">
        <img
          src={new URL("../assets/perfil.jpg", import.meta.url).href}
          alt="User"
          className="w-12 h-12 rounded-full border-2 border-gray-500"
        />
        <div>
          <h3 className="text-sm text-dark font-semibold">
            {user?.name || "Usuario"}
          </h3>
          <p className="text-xs text-gray">ID: {user?.id || "N/A"}</p>
        </div>
      </div>

      <hr className="my-4 border-t border-gray_light mx-8" />

      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`hover:text-primary p-3 flex items-center gap-2 ${isActive("/")}`}
            >
              <FaHome /> Inicio
            </Link>
          </li>
          
          {/* Mostrar el enlace solo si el usuario es admin */}
          {user?.range === "admin" && (
            <>
            <li>
            <Link
              to="/measure"
              className={`hover:text-primary p-3 flex items-center gap-2 ${isActive("/measure")}`}
            >
              <FaChartLine /> Grafica
            </Link>
          </li>
            <li>
              <Link
                to="/controlpanel"
                className={`hover:text-primary p-3 flex items-center gap-2 ${isActive("/panel-control")}`}
              >
                <FaUserShield /> Panel de Control
              </Link>
            </li>
            
          </>
          )}
        </ul>
      </nav>

      <hr className="my-4 border-t border-gray_light mx-8" />

      <div className="p-4">
        {isAuth ? (
          <button
            className="w-full flex items-center justify-center gap-2 hover:text-primary text-gray py-2 rounded-lg"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Cerrar Sesión
          </button>
        ) : (
          <button
            className="w-full flex items-center justify-center gap-2 hover:text-primary text-gray py-2 rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            <FaSignInAlt /> Iniciar Sesión
          </button>
        )}
      </div>

      {/* Modal de Inicio de Sesión */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-dark">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700">Usuario</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray rounded text-dark"
                  required
                  value={credentials.name}
                  onChange={(e) =>
                    setCredentials({ ...credentials, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray rounded text-dark"
                  required
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark"
              >
                Iniciar Sesión
              </button>
            </form>
            <button
              className="mt-4 text-sm text-gray-500 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
