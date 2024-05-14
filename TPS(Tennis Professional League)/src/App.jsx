import React, { useState } from 'react'
import Home from './Screens/Home';
import Login from './Screens/Login';

import firebaseApp from './Firebase/credenciales';
import {getAuth, onAuthStateChanged} from "firebase/auth";
const auth = getAuth(firebaseApp);

import{getFirestore, doc, getDoc} from "firebase/firestore";
const firestore = getFirestore(firebaseApp);

function App() {

  const[user,setUser] = useState(null);

  async function getRol(uid){

    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase){

    getRol(usuarioFirebase.uid).then((rol)=>{
      const userData = {
        uid : usuarioFirebase.uid,
        email : usuarioFirebase.email,
        rol: rol,
      }
      setUser(userData);
      console.log("userData final", userData);
      
    });
  }

  onAuthStateChanged(auth, (usuarioFirebase)=>{
    if(usuarioFirebase){

      if(!user){
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
     
    }else {
      setUser(null);
    }
  });

  return(
    <>

    {user ? <Home user={user}/> : <Login/>}
      
    </>
  );
}

export default App;