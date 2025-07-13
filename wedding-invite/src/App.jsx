import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Schedule from './pages/Schedule';
import RSVP from './pages/RSVP';
import Info from './pages/Info';
import Confirmation from './pages/Confirmation';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <Link to="/">💒 Our Wedding</Link>
            </div>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/schedule">Schedule</Link>
              <Link to="/rsvp">RSVP</Link>
              <Link to="/info">Info</Link>
              <Link to="/admin">Admin</Link>
            </div>
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/info" element={<Info />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        
        <footer className="footer">
          <p>&copy; 2024 Our Wedding Celebration</p>
        </footer>
      </div>
    </Router>
  );
}

export default App; 