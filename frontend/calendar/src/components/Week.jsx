import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid';
import ptBrLocale  from '../assets/utils/javascript/locale'

export function WeekCalendar() {

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin ]}
        initialView='timeGridWeek'
        weekends={true}
        locales={[ptBrLocale]}
        allDaySlot={false}
      />
    </div>
  )
}
