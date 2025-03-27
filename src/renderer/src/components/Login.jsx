import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(name, password);
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-white p-6 shadow-lg rounded-lg w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-3 border rounded" />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Ingresar</button>
      </form>
    </div>
  );
}
