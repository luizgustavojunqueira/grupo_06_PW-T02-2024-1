import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import locale from '../assets/utils/javascript/locale';
import '../assets/utils/css/geral.css'
import '../assets/utils/css/month.css'
import ModalAddEvent from './ModalAddEvent';

export function MonthCalendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const events = [
    { title: 'Evento 1', start: '2024-06-02T10:00:00', end: '2024-06-02T12:00:00' },
    { title: 'Evento 2', start: '2024-06-02T12:00:00', end: '2024-06-02T14:00:00' }
  ]

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
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
      />
      <ModalAddEvent isOpen={modalOpen} onClose={closeModal} selectedDate={selectedDate} initialStartTime={''}/>
    </main>
  )
}