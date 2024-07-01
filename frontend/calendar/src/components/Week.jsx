import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import ptBrLocale from '../assets/utils/javascript/locale'
import '../assets/utils/css/geral.css'
import '../assets/utils/css/week.css'
import ModalAddEvent from './ModalAddEvent';
import ModalEditEvent from './ModalEditEvent';

export function WeekCalendar({ events, modalAddEventOpen, setModalAddEventOpen, updateCalendar }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(false);

  updateCalendar();

  const handleDateClick = (arg) => {
    const hours = arg.date.getHours();
    const minutes = arg.date.getMinutes();
    const date = new Date(arg.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    setSelectedDate(formattedDate);
    setSelectedStartTime(formattedTime)

    setModalAddEventOpen(true);
  };

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
    setEventModalOpen(true);
  };

  const closeAddEventModal = () => {
    setModalAddEventOpen(false);
    setSelectedDate(null);
  };

  const closeEditEventModal = () => {
    setEventModalOpen(false);
  };

  return (
    <main className='calendarWeekContent'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView='timeGridWeek'
        weekends={true}
        locales={[ptBrLocale]}
        allDaySlot={false}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      <ModalAddEvent isOpen={modalAddEventOpen} onClose={closeAddEventModal} selectedDate={selectedDate} initialStartTime={selectedStartTime} updateCalendar={updateCalendar} />
      <ModalEditEvent isOpen={eventModalOpen} onClose={closeEditEventModal} selectedEvent={selectedEvent} updateCalendar={updateCalendar} />
    </main>
  )
}
