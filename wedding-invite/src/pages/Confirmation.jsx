import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../theme.css';

const LotusSVG = () => (
  <svg className="flower-corner" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M60 110 Q70 90 90 100 Q80 80 100 80 Q80 70 110 60 Q90 60 100 40 Q80 50 80 30 Q70 50 60 10 Q50 50 40 30 Q40 50 20 40 Q30 60 10 60 Q30 70 20 80 Q40 80 30 100 Q50 90 60 110 Z"
        fill="#FFD700" stroke="#B22222" strokeWidth="2"/>
      <circle cx="60" cy="60" r="10" fill="#FFD700" stroke="#B22222" strokeWidth="2"/>
    </g>
  </svg>
);

const Confirmation = () => {
  const location = useLocation();
  const { attending, name } = location.state || { attending: true, name: 'Guest' };

  return (
    <div className="confirmation-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: 'var(--ivory)', position: 'relative' }}>
      <div className="page-header" style={{ textAlign: 'center', maxWidth: 600, position: 'relative' }}>
        <h1 style={{ color: 'var(--red)', fontFamily: 'var(--font-heading)' }}>Thank You, {name.split(' ')[0]}!</h1>
        <p style={{ color: 'var(--red)', fontWeight: 600 }}>Your RSVP has been received</p>
        <LotusSVG />
      </div>

      <div className="card confirmation-card" style={{ maxWidth: 600, textAlign: 'center' }}>
        <div className="confirmation-icon" style={{ fontSize: '2.5rem' }}>{attending ? '✅' : '💝'}</div>
        <h2 style={{ color: 'var(--red)' }}>{attending ? 'We Can\'t Wait to See You!' : 'We\'ll Miss You!'}</h2>
        <p>
          {attending 
            ? `Thank you for confirming your attendance, ${name}! We're excited to celebrate our special day with you.`
            : `Thank you for letting us know, ${name}. We understand and will miss you on our special day.`
          }
        </p>
        {attending && (
          <div className="confirmation-details" style={{ textAlign: 'left', margin: '2rem 0' }}>
            <h3>What's Next?</h3>
            <ul>
              <li>📧 You'll receive a confirmation email shortly</li>
              <li>📅 Mark your calendar for November 2, 2025</li>
              <li>📍 Venue: Dương Gia Palace, Uông Bí City, Việt Nam</li>
              <li>⏰ Ceremony starts at 11:00 AM</li>
              <li>🎉 Reception and party to follow</li>
            </ul>
          </div>
        )}
        <div className="confirmation-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn">Back to Home</Link>
          <Link to="/schedule" className="btn btn-primary">View Schedule</Link>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
        <h3>Need to Make Changes?</h3>
        <p>
          If you need to modify your RSVP or have any questions, 
          please don't hesitate to contact us:
        </p>
        <div className="contact-info" style={{ background: '#f5f5dc', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
          <p>📧 <a href="mailto:jasper.e.karlen@gmail.com">jasper.e.karlen@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation; 