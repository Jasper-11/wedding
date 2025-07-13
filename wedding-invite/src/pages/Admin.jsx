import React, { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'wedding2025'; // Change this to your desired password

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
      fetch('/users/rsvps')
        .then(res => res.json())
        .then(data => setRsvps(data));
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
    const csv = toCSV(rsvps);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvps.csv';
    a.click();
    URL.revokeObjectURL(url);
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
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>First Name</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Last Name</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Attendance</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Dietary</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Questions</th>
                    <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r, i) => (
                    <tr key={i}>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.firstName}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.lastName}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.attendance}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.dietaryRestrictions}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.questions}</td>
                      <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{r.submittedAt}</td>
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