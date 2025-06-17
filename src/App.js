import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import NoteInput from './components/NoteInput';
import NotesList from './components/NotesList';

function App() {
  return (
    <Router>
      <div className="App">
        <MainHeader />
        <Routes>
          <Route path="/" element={<NoteInput />} />
          <Route path="/notes" element={<NotesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
