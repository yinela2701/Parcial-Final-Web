// src/components/AdminView.js
import React, { useEffect, useState } from 'react';
import { createTourney, readTourney } from '../Firebase/crud';
import { uploadImage } from '../Firebase/storage';
import TourneyView from './TourneyView';    

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
    <div>
      <input type="file" id="file-input" />
      <input type="text" id="name-tourney" placeholder="Nombre del torneo" />
      <input type="date" id="deadline-tourney" />
      <input type="number" id="limit-tourney" placeholder="Límite de participantes" />

      <button
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

      <div>
        {tourneys.map((tourney, index) => (
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
        ))}
      </div>
    </div>
  );
}

export default AdminView;
