import { useState } from 'react'
import './App.css'
import './assets/utils/css/geral.css'
import { MonthCalendar } from './components/Month'
import { WeekCalendar } from './components/Week';
import { DayCalendar } from './components/Day';

function App() {
  const [view, setView] = useState('month')
  const [modalOpen, setModalOpen] = useState(false);

  /* virá do banco de dados */
  const events = [
    { title: 'Evento 1', start: '2024-06-02T10:00:00', end: '2024-06-02T12:00:00', id:"1" },
    { title: 'Evento 2', start: '2024-06-03T12:00:00', end: '2024-06-03T14:00:00', id:"2" }
  ]

  const renderView = () => {
    switch (view) {
      case 'month':
        return <MonthCalendar events={events} modalOpen={modalOpen} setModalOpen={setModalOpen}/>;
      case 'week':
        return <WeekCalendar events={events} modalOpen={modalOpen} setModalOpen={setModalOpen}/>;
      case 'day':
        return <DayCalendar events={events} modalOpen={modalOpen} setModalOpen={setModalOpen}/>;
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
