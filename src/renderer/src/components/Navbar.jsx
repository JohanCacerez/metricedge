import { FaChartBar, FaFileAlt, FaCog, FaHome, FaUserShield, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Navbar({ user = { photo: '', name: '', id: '' }, onLogout }) {
  return (
    <div className="w-64 h-screen bg-white text-white flex flex-col">
      {/* Nombre de la App */}
      <div className="py-4 text-center text-xl font-bold text-dark">MetricEdge</div>

      {/* Info del Usuario */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={user.photo || 'https://via.placeholder.com/50'}
          alt="User"
          className="w-12 h-12 rounded-full border-2 border-gray-500"
        />
        <div>
          <h3 className="text-sm text-dark font-semibold">{user.name || 'Usuario'}</h3>
          <p className="text-xs text-gray">ID: {user.id || 'N/A'}</p>
        </div>
      </div>

      <hr className="my-4 border-t border-gray_light mx-8" />

      {/* Menú de Opciones */}
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="hover:text-primary text-gray p-3 flex items-center gap-2 cursor-pointer"
            >
              <FaHome /> Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/graficas"
              className="hover:text-primary text-gray p-3 flex items-center gap-2 cursor-pointer"
            >
              <FaChartBar /> Gráficas
            </Link>
          </li>
          <li>
            <Link
              to="/reportes"
              className="hover:text-primary text-gray p-3 flex items-center gap-2 cursor-pointer"
            >
              <FaFileAlt /> Reportes
            </Link>
          </li>
          <li>
            <Link
              to="/configuracion"
              className="hover:text-primary text-gray p-3 flex items-center gap-2 cursor-pointer"
            >
              <FaCog /> Configuración
            </Link>
          </li>
          <li>
            <Link
              to="/panel-control"
              className="hover:text-primary text-gray p-3 flex items-center gap-2 cursor-pointer"
            >
              <FaUserShield /> Panel de Control
            </Link>
          </li>
        </ul>
      </nav>

      <hr className="my-4 border-t border-gray_light mx-8" />

      {/* Botón de Cerrar Sesión */}
      <div className="p-4">
        <button
          className="w-full flex items-center justify-center gap-2 hover:text-primary text-gray py-2 rounded-lg"
          onClick={onLogout}
        >
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};
