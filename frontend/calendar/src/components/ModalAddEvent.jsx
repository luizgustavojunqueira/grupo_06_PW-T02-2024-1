import React, { useState, useEffect } from 'react';
import '../assets/utils/css/modalAddEvent.css'

function ModalAddEvent({ isOpen, onClose, selectedDate, initialStartTime = '00:00' }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState('');
    
  useEffect(() => {
    setStartTime(initialStartTime);
  }, [initialStartTime]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleSubmit = () => {
    /* salvar no banco de dados */
    console.log('Título:', title);
    console.log('Descrição:', description);
    console.log('horario: ', startTime)
    console.log('horario final: ', endTime)

    setTitle('');
    setDescription('');
    setEndTime('');
    setStartTime('');

    onClose();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    isOpen && (
      <div className="modal-add-event-overlay" onClick={onClose}>
        <div className="modal-add-event" onClick={stopPropagation}>
          <h2>Adicionar Evento no dia <br/> {selectedDate}</h2>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
          <div className='schedule-container'>
            <label htmlFor="startTime">Hora de Início:</label>
            <input type="time" className="inputTime" value={startTime} onChange={handleStartTimeChange} />
            <label htmlFor="startTime">Hora de Término:</label>
            <input type="time" className="inputTime" value={endTime} onChange={handleEndTimeChange} />
          </div>
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
          <button className="submitButton" onClick={handleSubmit}>Adicionar Evento</button>
        </div>
      </div>
    )
  );
}

export default ModalAddEvent;