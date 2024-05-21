import React from 'react'
import { createTourney, deleteTourney, readTourney, readTourneyById, updateTourney} from '../Firebase/crud';

function AdminView() {
  return (

    <div>Hola, admin
      
      <input type="text" id="name-tourney" placeholder="Nombre del torneo" />
      <input type="date" id="deadline-tourney" />
      {/*<input type="file" id="image-tourney" />*/}
      <input type="number" id="limit-tourney" placeholder="Límite de participantes" />
      
      <button
        onClick={async () => {
          const input1 = document.getElementById('name-tourney').value;
          const input2 = document.getElementById('deadline-tourney').value;
          // const input3 = document.getElementById('image-tourney').files[0]; // Descomentar si se utiliza la imagen
          const input4 = parseInt(document.getElementById('limit-tourney').value, 10);

          if (input1 && input2 && input4) {
            await createTourney(input1, input2, input4);
            console.log('The tourney was created');
          } else {
            console.error('Por favor, completa todos los campos requeridos.');
          }
        }}
      >
        Crear Torneo
      </button>

      <button
        onClick={async () => { 
          const response = await readTourney();
          console.log("response ", response);
        }}
      >
        Ver torneos
      </button>

      {/*<button
        onClick={async () => { 
          const id = "qnLbKmCNaXmi60lvYCR2";
          const response = await readTourneyById(id);
          console.log("response ", response);
        }}
      >
        Ver torneo específico
      </button>
      */}

      <button
        onClick={async () => {
          const id = "qnLbKmCNaXmi60lvYCR2"; //Organizar para que el id pueda suministrarlo en administrador
          const input1 = document.getElementById('name-tourney').value;
          const input2 = document.getElementById('deadline-tourney').value;
          // const input3 = document.getElementById('image-tourney').files[0]; // Descomentar si se utiliza la imagen
          const input4 = parseInt(document.getElementById('limit-tourney').value, 10);

          if (id && input1 && input2 && !isNaN(input4)) {
            await updateTourney(id, input1, input2, input4);
            console.log('The tourney was updated successfully');
          } else {
            console.error('Por favor, completa todos los campos requeridos.');
          }
        }}
      >
        Actualizar Torneo
      </button>

      <button
        onClick={async () => { 
          const id = "qnLbKmCNaXmi60lvYCR2";
          const response = await deleteTourney(id);
          console.log("Tourney deleted response:", response);
        }}
      >
        Eliminar torneo específico
      </button>


    </div>
    
  )
}

export default AdminView
