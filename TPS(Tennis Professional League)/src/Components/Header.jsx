import React, { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../Firebase/credenciales'; 
import readUserById from '../Firebase/crud';
import './Header.css';

const auth = getAuth(firebaseApp);

function Header({ user }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userData = await readUserById(user.uid);
        
        setUserName(userData.nombre);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserName();
  }, [user.uid]);

  return (
    <div className="header-container">
      <div className="user-info">
        <span>Bienvenido, {userName}</span>
      </div>
      <button className="logout-button" onClick={() => signOut(auth)}>Cerrar sesión</button>
    </div>
  );
}

export default Header;
