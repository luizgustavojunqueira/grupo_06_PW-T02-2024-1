import { useState } from 'react'
import './App.css'
import './assets/utils/css/geral.css'
import { MonthCalendar } from './components/Month'
import { WeekCalendar } from './components/Week';
import { DayCalendar } from './components/Day';

function App() {
  const [view, setView] = useState('month')

  const renderView = () => {
    switch (view) {
      case 'month':
        return <MonthCalendar />;
      case 'week':
        return <WeekCalendar />;
      case 'day':
        return <DayCalendar />;
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
