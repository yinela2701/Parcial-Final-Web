import React from 'react';
import Header from '../Components/Header';
import UserView from '../Components/UserView';
import AdminView from '../Components/AdminView';
import './Home.css';

function Home({ user }) {
  return (
    <div className="home-container">
      <Header user={user} />
      <div className="content-container">
        {user.rol === "admin" ? <AdminView /> : <UserView user={user} />}
      </div>
    </div>
  );
}

export default Home;
