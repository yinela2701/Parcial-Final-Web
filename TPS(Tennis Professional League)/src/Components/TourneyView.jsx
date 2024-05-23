import React, { useEffect, useState } from 'react';
import { deleteTourney } from '../Firebase/crud';
import { getImageUrlByName } from '../Firebase/storage';

function TourneyView({ imageName, id, name, date, participants }) {
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
    <div>
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <p>Fecha: {date}</p>
      <p>Número de participantes: {participants}</p>
      {imageUrl && <img width="100px" height="100px" src={imageUrl} alt={name} />}
      
      <button
        onClick={async () => {
          try {
            const response = await deleteTourney(id);
            console.log("Tourney deleted response:", response);
          } catch (error) {
            console.error("Error deleting tourney:", error);
          }
        }}
      >
        Eliminar
      </button>

      <button>Botón 2</button>
    </div>
  );
}

export default TourneyView;
