import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import locale from '../assets/utils/javascript/locale';

export function MonthCalendar() {

  return (
    <div>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView='dayGridMonth'
        weekends={true}
        locales={[locale]}
        fixedWeekCount={false}
      />
    </div>
  )
}