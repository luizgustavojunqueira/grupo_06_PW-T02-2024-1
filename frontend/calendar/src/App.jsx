import { useState, useEffect } from 'react'
import './App.css'
import './assets/utils/css/geral.css'
import { MonthCalendar } from './components/Month'
import { WeekCalendar } from './components/Week';
import { DayCalendar } from './components/Day';
import axios from 'axios';

import Cookies from 'js-cookie'

function App() {
  const [view, setView] = useState('month');
  const [modalAddEventOpen, setModalAddEventOpen] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  function transformEvents() {
    let eList = []
    userEvents.forEach((value) => {

      let newEvent = { title: value.title, start: value.initDate, end: value.endDate, id: value.id, description: value.description, location: value.local, recurrence: value.recurrence }

      let eventDateStart = new Date(value.initDate)
      let eventDateEnd = new Date(value.endDate)
      let weekDay = eventDateStart.getDay();

      switch (value.recurrence) {
        case "DAILY":
          newEvent.startRecur = value.initDate
          newEvent.startTime = formatTime(eventDateStart)
          newEvent.endTime = formatTime(eventDateEnd)
          break;
        case "WEEKLY":
          newEvent.daysOfWeek = [weekDay]
          newEvent.startRecur = value.initDate
          newEvent.startTime = formatTime(eventDateStart)
          newEvent.endTime = formatTime(eventDateEnd)
          break;
        case "MONTHLY":
          for (let i = 1; i < 12; i++) {
            let newStartDate = new Date(eventDateStart.setMonth(eventDateStart.getMonth() + 1)).toISOString();
            let newEndDate = new Date(eventDateEnd.setMonth(eventDateEnd.getMonth() + 1)).toISOString();
            eList.push({ ...newEvent, start: newStartDate, end: newEndDate})
          }
          break;
      }

      eList.push(newEvent);

    })

    console.log(eList);

    setEvents(eList);

  }


  function updateCalendar() {
    if (Cookies.get('token')) {
      console.log("Tem o tokoen");
      axios.get("/api/userEvents").then((response) => {
        setUserEvents(response.data);
      }).catch((err) => {
        console.log(err);
      })
    } else {
      axios.post("/api/login", { "email": "sla@gmail.com", password: "123" }).then(() => {
        console.log("logado");
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  /* virá do banco de dados */
  // const events = [
  //   { title: 'Evento 1', start: '2024-06-02T10:00:00', end: '2024-06-02T12:00:00', id: '1', description: 'Descrição do evento 1', location: "rua sem nome" },
  //   { title: 'Evento 2', start: '2024-06-03T12:00:00', end: '2024-06-03T14:00:00', id: '2', description: 'Descrição do evento 2', location: "rua sla" }
  // ];

  useEffect(() => {
    transformEvents()
  }, [userEvents])

  useEffect(() => {
    updateCalendar();
  }, []);


  const renderView = () => {
    switch (view) {
      case 'month':
        return <MonthCalendar updateCalendar={updateCalendar} events={events} modalAddEventOpen={modalAddEventOpen} setModalAddEventOpen={setModalAddEventOpen} />;
      case 'week':
        return <WeekCalendar updateCalendar={updateCalendar} events={events} modalAddEventOpen={modalAddEventOpen} setModalAddEventOpen={setModalAddEventOpen} />;
      case 'day':
        return <DayCalendar updateCalendar={updateCalendar} events={events} modalAddEventOpen={modalAddEventOpen} setModalAddEventOpen={setModalAddEventOpen} />;
      default:
        return null;
    }
  }

  return (
    <>
      <header className='divheader'>
        <h1>Calendar</h1>
        <div className='divButtons'>
          <button className='viewModeButton' onClick={() => setView('month')}>Mês</button>
          <button className='viewModeButton' onClick={() => setView('week')}>Semana</button>
          <button className='viewModeButton' onClick={() => setView('day')}>Dia</button>
          <button className='settingsButton'><p>C</p></button>
        </div>
      </header>
      {renderView()}
    </>
  )
}

export default App
