import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import ptBrLocale  from '../assets/utils/javascript/locale'
import '../assets/utils/css/geral.css'
import '../assets/utils/css/day.css'

export function DayCalendar() {

  return (
    <main className='calendarDayContent'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin ]}
        initialView='timeGridDay'
        weekends={true}
        locales={[ptBrLocale]}
        allDaySlot={false}
      />
    </main>
  )
}
