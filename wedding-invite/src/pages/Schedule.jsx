import React from 'react';

const Schedule = () => (
  <div className="schedule-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <div className="page-header" style={{ textAlign: 'center', maxWidth: 700 }}>
      <h1>Wedding Weekend Schedule</h1>
      <p>All the key events for our celebration in Uông Bí, Việt Nam</p>
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