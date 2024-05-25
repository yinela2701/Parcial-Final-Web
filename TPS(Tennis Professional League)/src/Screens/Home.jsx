import React from 'react'

import firebaseApp from '../Firebase/credenciales'
import Header from '../Components/Header'
import UserView from '../Components/UserView'
import AdminView from '../Components/AdminView'





function Home({user}) {
  return (
    <div>
     <Header user={user}></Header >
    
      {user.rol==="admin" ? <AdminView/> : <UserView user={user}/>}
    </div>
  )
}

export default Home
