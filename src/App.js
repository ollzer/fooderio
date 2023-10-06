import './App.css';
import { Route, Routes } from 'react-router-dom';
import WeekList from './WeekList';
import DayList from './DayList';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={ <div /> } />
      <Route path='/week' element={ <WeekList /> } />
      <Route path='/day' element={ <DayList /> } />
    </Routes>
    </div>
  );
}

export default App;
