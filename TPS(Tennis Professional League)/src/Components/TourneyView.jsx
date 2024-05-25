import React, { useEffect, useState } from 'react';
import { deleteTourney, readUseryById } from '../Firebase/crud';
import { getImageUrlByName } from '../Firebase/storage';
import './TourneyView.css'; 

function TourneyView({ imageName, id, name, date, participants, participantsInfo }) {

  const [imageUrl, setImageUrl] = useState('');
  const [participantsDetails, setParticipantsDetails] = useState([]);

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

  useEffect(() => {
    const fetchParticipantsDetails = async () => {
      try {
        const details = await Promise.all(participantsInfo.map(async (userId) => {
          const userDetails = await readUseryById(userId);
          return userDetails;
        }));
        setParticipantsDetails(details);
      } catch (error) {
        console.error("Error fetching participants details:", error);
      }
    };

    fetchParticipantsDetails();
  }, [participantsInfo]);

  return (
    <div className="tourney-container">

      <div className="tourney-image">
      <h2>{name}</h2>
        {imageUrl && <img src={imageUrl} alt={name} />}
      </div>

      <div className="tourney-details">
        
        <p>ID: {id}</p>
        <p>Fecha: {date}</p>
        <p>Número de participantes: {participants}</p>
        <h3>Participantes:</h3>
        <div className="tourney-participants">
          <ul>
            {participantsDetails.map((participant) => (
              <li key={participant.id}>
                Correo: {participant.correo}, Rol: {participant.rol}
              </li>
            ))}
          </ul>
        </div>
        <div className="tourney-buttons">
          <button className="tourney-button"
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
          <button className="tourney-button1" >Actualizar</button>
        </div>
      </div>
    </div>
  );
}

export default TourneyView;
