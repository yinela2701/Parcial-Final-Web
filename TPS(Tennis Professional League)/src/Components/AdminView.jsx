import React, { useEffect, useState } from 'react';
import { createTourney, readTourney } from '../Firebase/crud';
import { uploadImage } from '../Firebase/storage';
import TourneyView from './TourneyView';
import './AdminView.css'; // Importa el archivo CSS

function AdminView() {
  const [tourneys, setTourneys] = useState([]);

  const fetchTourneys = async () => {
    const response = await readTourney();
    console.log("Fetched tourneys:", response);
    setTourneys(response);
  };

  useEffect(() => {
    fetchTourneys();
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-container-1">
        <h2 className="admin-title">Crear Torneo</h2>
        <input type="file" id="file-input" className="admin-file-input" />
        <input type="text" id="name-tourney" placeholder="Nombre del torneo" className="admin-input" />
        <input type="date" id="deadline-tourney" className="admin-input" />
        <input type="number" id="limit-tourney" placeholder="Límite de participantes" className="admin-input" />
        <button
          className="admin-button"
          onClick={async () => {
            const input1 = document.getElementById('name-tourney').value;
            const input2 = document.getElementById('deadline-tourney').value;
            const input = document.getElementById('file-input');
            const file = input.files[0];
            const input4 = parseInt(document.getElementById('limit-tourney').value, 10);

            if (input1 && input2 && input4) {
              await uploadImage(file, file.name);
              await createTourney(file.name, input1, input2, input4);
              console.log('The tourney was created');
              fetchTourneys(); // Llama a fetchTourneys después de crear el torneo
            } else {
              console.error('Por favor, completa todos los campos requeridos.');
            }
          }}
        >
          Crear Torneo
        </button>
      </div>
      <div className="tourney-list">
        <h2 className="tourney-title">Torneos</h2>
        {tourneys.map((tourney, index) => (
          <div key={index} className="tourney-item1">
            <TourneyView
              key={tourney.id}
              imageName={tourney.image}
              id={tourney.id}
              name={tourney.name}
              date={tourney.registrationDeadline}
              participants={tourney.limitNumberParticipants}
              participantsInfo={tourney.participants}
              image={tourney.image}
              fetchTourneys={fetchTourneys} // Pasa fetchTourneys como prop
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminView;
