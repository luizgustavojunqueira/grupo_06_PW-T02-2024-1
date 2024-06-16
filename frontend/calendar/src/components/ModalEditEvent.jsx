import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import '../assets/utils/css/modalAddEvent.css'
import axios from 'axios';

function ModalEditEvent({ isOpen, onClose, selectedEvent, updateCalendar }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [recurrence, setRecurrence] = useState('');
  const [id, setId] = useState(null);

  const recurrenceOptions = [
    { value: "NONE", label: "Nenhuma" },
    { value: 'DAILY', label: 'Diária' },
    { value: 'WEEKLY', label: 'Semanal' },
    { value: 'MONTLHY', label: 'Mensal' }
  ]

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title || '');
      setDescription(selectedEvent.extendedProps?.description || '');
      setStartTime(formatTime(selectedEvent.start) || '');
      setEndTime(formatTime(selectedEvent.end) || '');
      setLocation(selectedEvent.extendedProps?.location || '');
      setRecurrence(selectedEvent.extendedProps?.recurrence || '');
      setId(selectedEvent.id || null);
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

  const handleRecurrenceChange = (newSelection) => {
    setRecurrence(newSelection.value);
  }

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


    let eventStartDate = new Date(selectedEvent.start);
    let eventEndDate = new Date(selectedEvent.end);

    if (startTime) {
      let hours = startTime.split(':')[0];
      let min = startTime.split(':')[1];

      eventStartDate.setHours(hours);
      eventStartDate.setMinutes(min);

    }

    if (endTime) {
      let hours = endTime.split(':')[0]
      let min = endTime.split(':')[1]
      eventEndDate.setHours(hours);
      eventEndDate.setMinutes(min);
    }

    let event = { title: title, description: description, initDate: eventStartDate.toISOString(), endDate: eventEndDate.toISOString(), local: location, recurrence: recurrence }


    axios.put(`/api/updateEvent/${id}`, event).then((res) => {
      console.log(res);
      updateCalendar();
    }).catch((err) => {
      console.log(err)
    })

    setTitle('');
    setDescription('');
    setEndTime('');
    setStartTime('');
    setRecurrence('');
    setLocation('');

    onClose();
  };


  const handleDelete = () => {
    axios.delete(`/api/deleteEvent/${id}`).then((res) => {
      console.log(res);
      updateCalendar();
    }).catch((err) => console.log(err))


    onClose();
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    isOpen && (
      <div className="modal-add-event-overlay" onClick={onClose}>
        <div className="modal-add-event" onClick={stopPropagation}>
          <h2>Editar Evento no dia <br />{formatDate(selectedEvent.start)}</h2>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
          <div className='schedule-container'>
            <label htmlFor="startTime">Hora de Início:</label>
            <input type="time" className="inputTime" value={startTime} onChange={handleStartTimeChange} />
            <label htmlFor="startime">Hora de Término:</label>
            <input type="time" className="inputTime" value={endTime} onChange={handleEndTimeChange} />
          </div>
          <label htmlFor="location">Local:</label>
          <input type="text" id="location" value={location} onChange={handleLocationChange} />
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
          <label htmlFor='recurrence'>Recorrência: </label>
          <Select id="recurrence" options={recurrenceOptions} onChange={handleRecurrenceChange} placeholder="Recorrência" defaultValue={recurrenceOptions[0]} />
          <button className="submitButton" onClick={handleSubmit}>Editar Evento</button>
          <button className="submitButton" onClick={handleDelete}>Remover Evento</button>
        </div>
      </div>
    )
  );
}

export default ModalEditEvent;
