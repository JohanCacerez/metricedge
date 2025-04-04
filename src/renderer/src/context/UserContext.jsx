import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const createUser = async (id, username, password, range) => {
    try {
      const response = await window.api.createUser(id, username, password, range)
      if (response.success) {
        console.log('Usuario creado exitosamente')
        return {success: true, message: 'Usuario creado exitosamente'}
      } else {
        console.log('Error:', response.message)
        return {success: false, message: response.message}
        
      }
    } catch (error) {
      console.log('Error:', error.message)
    }
  };

  const editUser = async (id, username, password, range) => {
    try {
      const response = await window.api.editUser(id, username, password, range)
      if (response.success) {
        console.log('Usuario creado exitosamente')
        return {success: true, message: 'Usuario creado exitosamente'}
      } else {
        console.log('Error:', response.message)
        return {success: false, message: response.message}
        
      }
    } catch (error) {
      console.log('Error:', error.message)
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await window.api.userDelete(id)
      if (response.success) {
        console.log('Usuario eliminado exitosamente')
        return {success: true, message: 'Usuario eliminado exitosamente'}
      } else {
        console.log('Error:', response.message)
        return {success: false, message: response.message}
        
      }
    } catch (error) {
      console.log('Error:', error.message)
    }
  };

  const searchUserById = async (id) => {
    try {
      const response = await window.api.searchUserById(id)
      if (response.success) {
        console.log('Usuario encontrado:', response.user)
        return {success: true, user: response.user}
      } else {
        console.log('Error:', response.message)
        return {success: false, message: response.message}
        
      }
    } catch (error) {
      console.log('Error:', error.message)
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, createUser, editUser, deleteUser, searchUserById }}>
      {children}
    </UserContext.Provider>
  );
};
