import React, { useState } from 'react';
import './Login.css';
import firebaseApp from '../Firebase/credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import logo from '../assets/logotenis.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';

const auth = getAuth(firebaseApp);

function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function registrarUsuario(email, password, rol, name, age) {
    console.log("Submit", email, password, name, age, rol);
    const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);

    const docRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docRef, { correo: email, rol: rol, nombre: name, edad : age });

    setIsLoggedIn(true);
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const name = isRegistrando ? e.target.elements.name.value : null;
    const age = isRegistrando ? e.target.elements.age.value : null;
    const rol = isRegistrando ? e.target.elements.rol.value : null;
   

    

    if (isRegistrando) {
      registrarUsuario(email, password, rol, name, age);
    } else {
      signInWithEmailAndPassword(auth, email, password).then(() => setIsLoggedIn(true));
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-section">
          <img src={logo} alt="Logo" />
        </div>
        <div className="form-section">
          <h1>{isRegistrando ? "Regístrate" : "Bienvenido de nuevo"}</h1>
          <p>Por favor, inicia sesión para acceder a los mejores torneos</p>
          <form onSubmit={submitHandler}>
            <div className="input-group">
              <i className="fas fa-envelope input-icon"></i>
              <input type="email" id="email" placeholder="Introduce tu correo electrónico" required />
            </div>
            <div className="input-group">
              <i className="fas fa-lock input-icon"></i>
              <input type="password" id="password" placeholder="Introduce tu contraseña" required />
            </div>
            {isRegistrando && (
              <div className="input-group">
               <i className="fas fa-user input-icon"></i>
               <input type="text" id="name" placeholder="Introduce tu nombre" required />
             </div>
            )}

            {isRegistrando && (
              <div className="input-group">
               <i className="fas fa-calendar-days input-icon"></i>
               <input type="text" id="age" placeholder="Introduce tu edad" required />
             </div>
            )}
            {isRegistrando && (
              <label className="rol-label">
                Rol:
                <select id="rol">
                  <option value="admin">Administrador</option>
                  <option value="user">Usuario</option>
                </select>
              </label>   
            )}

          
            
            
            <input type="submit" value={isRegistrando ? "Registrar" : "Iniciar sesión"} className="submit-btn" />
          </form>
        
          {!isLoggedIn && (
            <button onClick={() => setIsRegistrando(!isRegistrando)}>
              {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

