import React, { useState, useEffect } from 'react';
import '../assets/utils/css/modalAddEvent.css'

function ModalEditEvent({ isOpen, onClose, selectedEvent}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || '');
      setDescription(selectedEvent.extendedProps?.description || '');
      setStartTime(formatTime(selectedEvent.start) || '');
      setEndTime(formatTime(selectedEvent.end) || '');
      setLocation(selectedEvent.extendedProps?.location || '');
    }

  }, [isOpen]);

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

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSubmit = () => {
    /* salvar no banco de dados e, provavelmente, atualizar uma var que irá atualizar a renderização dos eventos*/
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
          <h2>Editar Evento no dia <br/>{formatDate(selectedEvent.start)}</h2>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
          <div className='schedule-container'>
            <label htmlFor="startTime">Hora de Início:</label>
            <input type="time" className="inputTime" value={startTime} onChange={handleStartTimeChange} />
            <label htmlFor="startTime">Hora de Término:</label>
            <input type="time" className="inputTime" value={endTime} onChange={handleEndTimeChange} />
          </div>
          <label htmlFor="location">Local:</label>
          <input type="text" id="location" value={location} onChange={handleLocationChange} />
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
          <button className="submitButton" onClick={handleSubmit}>Editar Evento</button>
        </div>
      </div>
    )
  );
}

export default ModalEditEvent;