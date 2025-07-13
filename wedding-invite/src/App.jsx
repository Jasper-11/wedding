import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Schedule from './pages/Schedule';
import RSVP from './pages/RSVP';
import Info from './pages/Info';
import Confirmation from './pages/Confirmation';
import Admin from './pages/Admin';
import './App.css';
import './theme.css';

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar" style={{
      background: 'var(--ivory)',
      borderBottom: '3px solid var(--gold)',
      boxShadow: '0 2px 12px rgba(139,0,0,0.04)',
      padding: '0.5rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="nav-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 1200,
        margin: '0 auto',
        gap: '2.5rem',
      }}>
        {[
          { to: '/', label: 'Home' },
          { to: '/gallery', label: 'Gallery' },
          { to: '/schedule', label: 'Schedule' },
          { to: '/rsvp', label: 'RSVP' },
          { to: '/info', label: 'Info' },
          { to: '/admin', label: 'Admin' },
        ].map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={location.pathname === link.to ? 'nav-link active' : 'nav-link'}
            style={{
              color: 'var(--red)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '1.15rem',
              textDecoration: 'none',
              padding: '0.5rem 1.2rem',
              borderRadius: '999px',
              transition: 'background 0.2s, color 0.2s',
              background: location.pathname === link.to ? 'var(--gold)' : 'transparent',
              boxShadow: location.pathname === link.to ? '0 2px 8px rgba(139,0,0,0.06)' : 'none',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
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