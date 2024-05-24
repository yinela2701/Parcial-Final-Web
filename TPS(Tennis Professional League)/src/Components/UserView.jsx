import React, { useEffect, useState } from 'react';
import { readTourney, addUserToTourney } from '../Firebase/crud';
import './UserView.css';

function UserView({user}) {
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
      alert('You have been registered for the tourney');
    } catch (e) {
      console.error('Error registering for the tourney: ', e);
    }
  };

  return (
    <div className="tourneys-container">
      <div className="tourneys-box">
        <h1>Available Tourneys</h1>
        <ul>
          {tourneys.map((tourney, index) => (
            <li key={index} className="tourney-item">
              <h2>{tourney.name}</h2>
              <p>Registration Deadline: {tourney.registrationDeadline}</p>
              <p>Limit Number of Participants: {tourney.limitNumberParticipants}</p>
              <button onClick={() => handleRegister(tourney.uid)}>Register</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserView;
