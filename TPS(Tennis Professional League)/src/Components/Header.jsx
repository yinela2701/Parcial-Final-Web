import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../Firebase/credenciales'; 
import readUserById from '../Firebase/crud';
import './Header.css';

const auth = getAuth(firebaseApp);

function Header({ user }) {
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await readUserById(user.uid);
        setUserName(userData.nombre);
        setUserRole(userData.rol);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [user.uid]);

  const getWelcomeMessage = () => {
    if (userRole === 'admin') {
      return `Bienvenido, Administrador ${userName}`;
    }
    return `Bienvenido, Usuario ${userName}`;
  };

  return (
    <div className="header-container">
      <div className="user-info">
        <span>{getWelcomeMessage()}</span>
      </div>
      <button className="logout-button" onClick={() => signOut(auth)}>Cerrar sesión</button>
    </div>
  );
}

export default Header;
