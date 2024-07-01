import { useState, useEffect } from 'react'
import { FaSignOutAlt } from 'react-icons/fa';
import './App.css'
import './assets/utils/css/geral.css'
import { MonthCalendar } from './components/Month'
import { WeekCalendar } from './components/Week';
import { DayCalendar } from './components/Day';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie'

function App() {
  const [view, setView] = useState('month');
  const [modalAddEventOpen, setModalAddEventOpen] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [events, setEvents] = useState([]);

  const navigateLogin = useNavigate()

  const formatTime = (date) => {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  };

  function updateCalendar() {
    if (Cookies.get('token')) {
      axios.get("/api/userEvents", { withCredentials: true }).then((response) => {
        setUserEvents(response.data);
      }).catch((err) => {
        console.log(err);
      })
    } else {
      navigateLogin('/login', { replace: true });
    }
  }

  const handleLogout = () => {
    console.log("teste");
    Cookies.remove("token");
    navigateLogin('/login', { replace: true });
  };

  useEffect(() => {
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
              eList.push({ ...newEvent, start: newStartDate, end: newEndDate })
            }
            break;
        }

        eList.push(newEvent);

      })

      setEvents(eList);

    }
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
        </div>
        <FaSignOutAlt className='logoutButton' onClick={handleLogout} />
      </header>
      {renderView()}
    </>
  )
}

export default App
