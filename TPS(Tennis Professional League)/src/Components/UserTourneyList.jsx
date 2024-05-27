import React, { useEffect, useState } from 'react';
import { getImageUrlByName } from '../Firebase/storage';
import './UserTourneyList.css';

function UserTourneyView({ imageName, id, name, date, participants, onRegister }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url = await getImageUrlByName(imageName);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [imageName]);

  return (
    <div className="tourney-view">
      <h2>{name}</h2>
      <p>Fecha: {date}</p>
      <p>Número de participantes: {participants}</p>
      {imageUrl && <div className="image-container"><img src={imageUrl} alt={name} /></div>}
      <button className="register-button" onClick={() => onRegister(id)}>Register</button>
    </div>
  );
}

export default UserTourneyView;
