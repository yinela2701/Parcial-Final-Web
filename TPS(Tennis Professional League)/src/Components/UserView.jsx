import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { readTourney, addUserToTourney } from '../Firebase/crud';
import UserTourneyView from './UserTourneyList';
import './UserView.css';

const MySwal = withReactContent(Swal);

function UserView({ user }) {
  const [tourneys, setTourneys] = useState([]);

  useEffect(() => {
    const fetchTourneys = async () => {
      const tourneyList = await readTourney();
      setTourneys(tourneyList);
    };

    fetchTourneys();
  }, []);

  const handleRegister = async (tourneyId) => {
    console.log('User Id:', user.uid);
    console.log('Tourney Id:', tourneyId);
    try {
      await addUserToTourney(tourneyId, user.uid);

      MySwal.fire({
        title: "Registrado!",
        text: "Su registro al torneo ha sido exitoso!",
        icon: "success",
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal-button--green',
        }
      });

    } catch (e) {
      console.error('Error registering for the tourney: ', e);
      MySwal.fire({
        title: "Error!",
        text: "There was an error registering for the tournament. Please try again.",
        icon: "error",
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'swal-button--green',
        }
      });
    }
  };

  return (
    <div className="tourneys-container">
      <div className="tourneys-box">
        <h1>Torneos Disponibles</h1>
        <ul className="tourneys-list">
          {tourneys.map((tourney, index) => (
            <li key={index} className="tourney-item">
              <UserTourneyView
                id={tourney.id}
                name={tourney.name}
                date={tourney.registrationDeadline}
                participants={tourney.limitNumberParticipants}
                imageName={tourney.image}
                onRegister={handleRegister}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserView;
