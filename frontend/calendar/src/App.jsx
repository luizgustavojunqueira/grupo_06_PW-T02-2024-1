import { useState } from 'react'
import './App.css'
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
      <div>
        <button onClick={() => setView('month')}>Mês</button>
        <button onClick={() => setView('week')}>Semana</button>
        <button onClick={() => setView('day')}>Dia</button>
      </div>
      {renderView()}
    </>
  )
}

export default App
