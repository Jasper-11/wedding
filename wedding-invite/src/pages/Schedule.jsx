import React from 'react';
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

const Schedule = () => (
  <div className="schedule-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: 'var(--ivory)', position: 'relative' }}>
    <div className="page-header" style={{ textAlign: 'center', maxWidth: 700, position: 'relative' }}>
      <h1 style={{ color: 'var(--red)', fontFamily: 'var(--font-heading)' }}>Wedding Weekend Schedule</h1>
      <p style={{ color: 'var(--red)', fontWeight: 600 }}>All the key events for our celebration in Uông Bí, Việt Nam</p>
      <LotusSVG />
    </div>
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>Saturday, November 1, 2025</h2>
      <ul>
        <li><strong>3:00 PM</strong> – Ceremony at the bride’s house <br /><em>Dress code: Traditional "ao dai"</em></li>
        <li><strong>6:00 PM</strong> – Wedding dinner (2 families at restaurant, 40 people)</li>
        <li><strong>7:00 PM</strong> – Karaoke at the bride’s house</li>
      </ul>
    </div>
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>Sunday, November 2, 2025</h2>
      <ul>
        <li><strong>10:00 AM</strong> – Breakfast at hotel</li>
        <li><strong>11:00 AM</strong> – Official Wedding Ceremony at Dương Gia Palace <br /><em>Dress code: Men in suit, women in formal dress</em></li>
        <li><strong>1:00 PM</strong> – Party at the bar</li>
        <li><strong>8:00 PM</strong> – Coffee available in the evening if needed</li>
      </ul>
    </div>
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>Monday, November 3, 2025 (Optional)</h2>
      <ul>
        <li>Group sightseeing: Visit Ba Vang Pagoda, Yên Tử, or Ha Long city</li>
      </ul>
    </div>
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>Tuesday, November 4, 2025 (Optional)</h2>
      <ul>
        <li>Ha Long Bay cruise (please RSVP if interested)</li>
      </ul>
    </div>
    <div className="card" style={{ maxWidth: 700, textAlign: 'center' }}>
      <h3>Need help or have questions?</h3>
      <p>Contact Jasper & Trang: <br />📧 <a href="mailto:jasper.e.karlen@gmail.com">jasper.e.karlen@gmail.com</a></p>
    </div>
  </div>
);

export default Schedule; 