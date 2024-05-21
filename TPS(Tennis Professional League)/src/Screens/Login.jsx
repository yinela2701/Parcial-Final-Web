import React, {useState} from 'react';

import firebaseApp from '../Firebase/credenciales';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
const auth = getAuth(firebaseApp);

import {getFirestore, doc, setDoc} from "firebase/firestore";


function Login() {

  const firestore = getFirestore(firebaseApp);

  const[isRegistrando, setIsRegistrando ] = useState(false);
  
  async function registrarUsuario(email, password,rol) {

    const infoUsuario = await createUserWithEmailAndPassword(auth,email,password).then((usuarioFirebase) => 
    {
      return usuarioFirebase;
    }); //Esto crea una promesa con toda la información del usuario que se ha creado

    console.log(infoUsuario.user.uid);


    //Guardar el usuario en la base de dato teniendo en cuenta el uid que da el registro de firebase
    const docRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`); //Referencia a la base de datos 
    setDoc(docRef, {correo: email, rol: rol});
  
  }
  
  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    console.log("Submit", email, password, rol);

    if(isRegistrando) {
      //Registrar 
      registrarUsuario(email,password,rol);

    } else {
      //Login
      signInWithEmailAndPassword(auth, email, password);
    }

    
  }
  
  return (
    <div>
    
    <h1>{isRegistrando ? "Regístrate": "Inicia sesión" }</h1>
    
    <form onSubmit={submitHandler}>
      <label>
        Correo electrónico:
        <input type="email" id="email"/> 
      </label>

      <label>
        Contraseña:
        <input type="password" id="password"/> 
      </label>

      <label>
        Rol:
        <select id="rol">

          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>

        </select>
        
      </label>

      <input type="submit" value={isRegistrando ? "Registrar" : "Iniciar sesión"}/>

    </form>

    <button onClick={() => setIsRegistrando (!isRegistrando)}>
      
      {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
    
    </button>

    </div>
  )
}

export default Login
