import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import '../assets/utils/css/modalAddEvent.css'
import axios from 'axios';

function ModalAddEvent({ isOpen, onClose, selectedDate, initialStartTime = '00:00', updateCalendar }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState('');
  const [recurrence, setRecurrence] = useState('NONE');

  const recurrenceOptions = [
    { value: "NONE", label: "Nenhuma" },
    { value: 'DAILY', label: 'Diária' },
    { value: 'WEEKLY', label: 'Semanal' },
    { value: 'MONTHLY', label: 'Mensal' }
  ]

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

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleRecurrenceChange = (newSelection) => {
    setRecurrence(newSelection.value);
  }

  const handleSubmit = () => {

    let event = { title: title, description: description, local: location, recurrence: recurrence }

    if (!(startTime == null && endTime == null)) {

      let eventStartDate = new Date(selectedDate);
      let eventEndDate = new Date(selectedDate);
      let hours = startTime.split(':')[0];
      let min = startTime.split(':')[1];

      eventStartDate.setDate(eventStartDate.getDate() + 1);
      eventStartDate.setHours(hours);
      eventStartDate.setMinutes(min);

      eventEndDate.setDate(eventEndDate.getDate() + 1);
      if (endTime) {
        hours = endTime.split(':')[0]
        min = endTime.split(':')[1]
      }

      eventEndDate.setHours(hours);
      eventEndDate.setMinutes(min);

      event.initDate = eventStartDate.toISOString();
      event.endDate = eventEndDate.toISOString();
    }


    console.log(event);
    axios.post('/api/createEvent', event, { withCredentials: true }).then((res) => {

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

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    isOpen && (
      <div className="modal-add-event-overlay" onClick={onClose}>
        <div className="modal-add-event" onClick={stopPropagation}>
          <h2>Adicionar Evento no dia <br /> {selectedDate}</h2>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
          <div className='schedule-container'>
            <div className='timeSelection-container'>

              <label htmlFor="startTime">Hora de Início:</label>
              <input type="time" className="inputTime" value={startTime} onChange={handleStartTimeChange} />

            </div>
            <div className='timeSelection-container'>

              <label htmlFor="endTime">Hora de Término:</label>
              <input type="time" className="inputTime" value={endTime} onChange={handleEndTimeChange} />
            </div>
          </div>
          <label htmlFor="location">Local:</label>
          <input type="text" id="location" value={location} onChange={handleLocationChange} />
          <label htmlFor="description">Descrição:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
          <label htmlFor='recurrence'>Recorrência: </label>
          <Select id="recurrence" options={recurrenceOptions} onChange={handleRecurrenceChange} placeholder="Recorrência" defaultValue={recurrenceOptions[0]} />
          <button className="submitButton" onClick={handleSubmit}>Adicionar Evento</button>
        </div>
      </div>
    )
  );
}

export default ModalAddEvent;
