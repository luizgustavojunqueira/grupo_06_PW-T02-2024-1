import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import locale from '../assets/utils/javascript/locale';
import '../assets/utils/css/geral.css'
import '../assets/utils/css/month.css'
import ModalAddEvent from './ModalAddEvent';
import ModalEditEvent from './ModalEditEvent';

export function MonthCalendar({ events, modalOpen, setModalOpen }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(false);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
    setEventModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const closeEditEventModal = () => {
    setEventModalOpen(false);
  };
  
  return (
    <main className='calendarMonthContent'>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView='dayGridMonth'
        weekends={true}
        locales={[locale]}
        fixedWeekCount={false}
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
      <ModalAddEvent isOpen={modalOpen} onClose={closeModal} selectedDate={selectedDate}/>
      <ModalEditEvent isOpen={eventModalOpen} onClose={closeEditEventModal} selectedEvent={selectedEvent}/>
    </main>
  )
}