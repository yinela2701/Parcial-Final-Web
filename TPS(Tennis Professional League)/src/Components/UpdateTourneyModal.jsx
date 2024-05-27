import React, { useState } from 'react';
import './UpdateTourneyModal.css';

function UpdateTourneyModal({ onClose, onSubmit, tourneyData }) {
  const [formData, setFormData] = useState(tourneyData);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen-input' && files.length > 0) {
      setImageFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, imageFile });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Actualizar Torneo</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Fecha:
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>
          <label>
            Máximo de participantes:
            <input type="number" name="participants" value={formData.participants} onChange={handleChange} />
          </label>
          <label>
            Imagen: 
            <input type="file" name="imagen-input" onChange={handleChange} />
          </label>
          <button type="submit">Guardar</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateTourneyModal;
