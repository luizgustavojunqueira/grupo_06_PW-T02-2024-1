import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import locale from '../assets/utils/javascript/locale';
import '../assets/utils/css/geral.css'
import '../assets/utils/css/month.css'
import ModalAddEvent from './ModalAddEvent';

export function MonthCalendar({ events, modalOpen, setModalOpen }) {
  const [selectedDate, setSelectedDate] = useState(null);

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
      <ModalAddEvent isOpen={modalOpen} onClose={closeModal} selectedDate={selectedDate}/>
    </main>
  )
}