import React, { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'admin123'; // Match the backend password

function toCSV(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(',')].concat(
    rows.map(row => headers.map(h => '"' + (row[h] || '').toString().replace(/"/g, '""') + '"').join(','))
  );
  return csv.join('\n');
}

const Admin = () => {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authed) {
      const API_URL = import.meta.env.VITE_API_URL || 'https://rsvplist.onrender.com';
      fetch(`${API_URL}/api/admin/rsvp?password=${ADMIN_PASSWORD}`)
        .then(res => res.json())
        .then(data => setRsvps(data))
        .catch(err => setError('Failed to load RSVPs'));
    }
  }, [authed]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError('');
    } else {
      setError('Incorrect password.');
    }
  };

  const handleExport = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'https://rsvplist.onrender.com';
    window.open(`${API_URL}/api/admin/export?password=${ADMIN_PASSWORD}`, '_blank');
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this RSVP?')) {
      const API_URL = import.meta.env.VITE_API_URL || 'https://rsvplist.onrender.com';
      const rsvp = rsvps[index];
      fetch(`${API_URL}/api/admin/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rsvp.name,
          plusOne: rsvp.plusOne || '',
          password: ADMIN_PASSWORD
        })
      })
        .then(res => res.json())
        .then(() => {
          setRsvps(rsvps.filter((_, i) => i !== index));
        });
    }
  };

  return (
    <div className="admin-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="page-header" style={{ textAlign: 'center', maxWidth: 700 }}>
        <h1>Admin: RSVP Submissions</h1>
      </div>
      {!authed ? (
        <form onSubmit={handleLogin} className="card" style={{ maxWidth: 400, textAlign: 'center' }}>
          <h3>Enter Admin Password</h3>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: '0.5rem', fontSize: '1.1rem', marginBottom: '1rem', width: '100%' }}
            placeholder="Password"
          />
          <br />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
          {error && <div className="error-message" style={{ marginTop: '1rem' }}>{error}</div>}
        </form>
      ) : (
        <div className="card" style={{ maxWidth: 900, margin: '2rem auto', textAlign: 'center' }}>
          <button className="btn btn-primary" style={{ float: 'right', marginBottom: '1rem' }} onClick={handleExport}>
            Export CSV
          </button>
          {rsvps.length === 0 ? (
            <p>No RSVPs yet.</p>
          ) : (
            <div style={{ overflowX: 'auto', clear: 'both' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>+1</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Attending</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Guests</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Dietary</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Message</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Timestamp</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r, i) => (
                    <tr key={i}>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.name}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.plusOne || '-'}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.attending ? 'Yes' : 'No'}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.guests}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.dietary}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.message}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{new Date(r.timestamp).toLocaleString()}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                        <button onClick={() => handleDelete(i)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin; 