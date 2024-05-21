import React from 'react'

import firebaseApp from '../Firebase/credenciales'
import{getAuth, signOut} from "firebase/auth"

import UserView from '../Components/UserView'
import AdminView from '../Components/AdminView'

const auth = getAuth(firebaseApp)




function Home({user}) {
  return (
    <div> Home 
      <button onClick={() => signOut(auth)}> Cerrar sesión </button>
    
      {user.rol==="admin" ? <AdminView/> : <UserView user={user}/>}
    </div>
  )
}

export default Home
