import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import ptBrLocale  from '../assets/utils/javascript/locale'
import '../assets/utils/css/geral.css'
import '../assets/utils/css/week.css'
import ModalAddEvent from './ModalAddEvent';

export function WeekCalendar({ events }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStartTime, setSelectedStartTime ] = useState('');

  const handleDateClick = (arg) => {
    console.log(events)
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

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <main className='calendarWeekContent'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin ]}
        initialView='timeGridWeek'
        weekends={true}
        locales={[ptBrLocale]}
        allDaySlot={false}
        events={events}
        dateClick={handleDateClick}
      />
      <ModalAddEvent isOpen={modalOpen} onClose={closeModal} selectedDate={selectedDate} initialStartTime={selectedStartTime} />
    </main>
  )
}
