// src/components/TourneyView.js
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { deleteTourney, readUseryById, updateTourney } from '../Firebase/crud';
import { getImageUrlByName, uploadImage } from '../Firebase/storage';
import UpdateTourneyModal from './UpdateTourneyModal'; 
import './TourneyView.css'; 
const MySwal = withReactContent(Swal);

function TourneyView({ imageName, id, name, date, participants, participantsInfo, image, fetchTourneys }) {
  const [imageUrl, setImageUrl] = useState('');
  const [participantsDetails, setParticipantsDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 

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

  const handleUpdate = async (updatedData) => {
    try {
      const { id, name, date, participants, imageFile } = updatedData;
      const success = await updateTourney(id, name, date, participants);
      if (imageFile) {
        await uploadImage(imageFile, image);
      }
      MySwal.fire({
        title: "Actualizado!",
        text: "El torneo fue actulizado con éxito",
        icon: "success",
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal-button--green',
        }
      });
      fetchTourneys(); 
      
    } catch (error) {
      console.error("Error updating tourney:", error);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteTourney(id);
      console.log("Tourney deleted response:", response);

      MySwal.fire({
        title: "Eliminado",
        text: "El torneo fue eliminado con éxito",
        icon: "success",
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal-button--green',
        }
      });

      fetchTourneys(); 
    } catch (error) {
      MySwal.fire({
        title: "Good job!",
        text: "You have successfully registered for the tournament!",
        icon: "success",
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal-button--green',
        }
      });
      
    }
  };

  return (
    <div className="tourney-container">
      <div className="tourney-image">
        <h2>{name}</h2>
        {imageUrl && <img src={imageUrl} alt={name} />}
      </div>

      <div className="tourney-details">
        <p>ID: {id}</p>
        <p>Fecha: {date}</p>
        <p>Máximo de participantes: {participants}</p>
        <h3>Participantes:</h3>
        <div className="tourney-participants">
          <ul>
            {participantsDetails.map((participant) => (
              <li key={participant.id}>
                Nombre: {participant.nombre} - Edad: {participant.edad}
              </li>
            ))}
          </ul>
        </div>
        <div className="tourney-buttons">
          <button className="tourney-button" onClick={handleDelete}>
            Eliminar
          </button>
          <button className="tourney-button1" onClick={() => setIsModalOpen(true)}>
            Actualizar
          </button>
        </div>
      </div>

      {isModalOpen && 
        <UpdateTourneyModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleUpdate} 
          tourneyData={{ id, name, date, participants }} 
        />
      }
    </div>
  );
}

export default TourneyView;
