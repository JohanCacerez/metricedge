import { useState } from "react";
import { useUser } from "../../context/UserContext";

const UserManagementModal = ({ isOpen, onClose }) => {
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [userId2, setUserId2] = useState("");
  const [username, setUsername] = useState("");
  const [username2, setUsername2] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [range, setRange] = useState("admin");
  const [range2, setRange2] = useState("admin");

  const { createUser } = useUser();
  const { deleteUser } = useUser();
  const { editUser } = useUser();
  const { searchUserById } = useUser();

  const handleCreateUser = async (event) => {
    event.preventDefault();
    if (!id || !username || !password || !range) {
      alert("Por favor, llena todos los campos.");
      return;
    }
    const response = await createUser(id, username, password, range);
    if (response.success) {
      alert("Usuario creado exitosamente");
      setId("");
      setUsername("");
      setPassword("");
      setRange("admin");
    } else {
      alert("Error: " + response.message);
    }
  };

  const handleDeleteUser = async (event) => {
    event.preventDefault();
    if (!userId) {
      alert("Por favor, ingresa un ID de usuario para eliminar.");
      return;
    }
    const response = await deleteUser(userId);
    if (response.success) {
      alert("Usuario eliminado exitosamente");
      setUserId(""); // Solo limpia el campo de ID
    } else {
      alert("Error: " + response.message);
    }
  };

  const handleSearchUser = async (event) => {
    event.preventDefault(); // Evita que se recargue la página
    
    const response = await searchUserById(userId2);
    if (response.success) {
      console.log("Usuario encontrado:", response.user);
      
      // Como response.user es un array de objetos, tomamos el primero
      const userData = response.user[0]; 
      
      setUsername2(userData.name);  // Asegura que el campo "Nombre" se llene
      setRange2(userData.range);    // Asegura que el "Tipo de usuario" se llene
    } else {
      console.log("Usuario no encontrado");
    }
  };
  
  

  const handleEditUser = async (event) => {
    event.preventDefault();
    if (!userId2) {
      alert("Por favor, ingresa un ID de usuario para editar.");
      return;
    }
    const response = await editUser(userId2, username2, password2, range2);
    if (response.success) {
      alert("Usuario editado exitosamente");
      setUserId2(""); // Solo limpia el campo de ID
      setUsername2(""); // Limpia el campo de nombre
      setPassword2(""); // Limpia el campo de contraseña
    } else {
      alert("Error: " + response.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Control de Usuarios
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <form
            onSubmit={handleCreateUser}
            autoComplete="off"
            className="bg-gray-100 p-4 rounded-lg shadow"
          >
            <h2 className="text-lg font-semibold mb-4">Registrar usuario</h2>
            <label className="block font-medium">ID:</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <label className="block font-medium">Nombre:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <label className="block font-medium">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <label className="block font-medium">Tipo de usuario:</label>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            >
              <option value="admin">Administrador</option>
              <option value="operador">Operador</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full"
            >
              Registrar
            </button>
          </form>

          <form
            className="bg-gray-100 p-4 rounded-lg shadow"
            onSubmit={handleDeleteUser}
          >
            <h2 className="text-lg font-semibold mb-4">Eliminar usuario</h2>
            <label className="block font-medium">ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
              Eliminar
            </button>
          </form>

          <form className="bg-gray-100 p-4 rounded-lg shadow" onSubmit={handleEditUser}>
            <h2 className="text-lg font-semibold mb-4">Editar usuario</h2>
            <label className="block font-medium">ID:</label>
            <input
              type="text"
              value={userId2}
              onChange={(e) => setUserId2(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mb-4" onClick={handleSearchUser}>
              Buscar
            </button>
            <label className="block font-medium">Nombre:</label>
            <input
              type="text"
              value={username2}
              onChange={(e) => setUsername2(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <label className="block font-medium">Contraseña:</label>
            <input
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            <label className="block font-medium">Tipo de usuario:</label>
            <select
              className="border border-gray-300 rounded p-2 mb-4 w-full"
              value={range2}
              onChange={(e) => setRange2(e.target.value)}
            >
              <option value="admin">Administrador</option>
              <option value="operador">Operador</option>
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full"
            >
              Editar
            </button>
          </form>
        </section>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementModal;
