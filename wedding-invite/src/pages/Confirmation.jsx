import React from 'react';
import { Link } from 'react-router-dom';

const Confirmation = () => {
  return (
    <div className="confirmation-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="page-header" style={{ textAlign: 'center', maxWidth: 600 }}>
        <h1>Thank You!</h1>
        <p>Your RSVP has been received</p>
      </div>

      <div className="card confirmation-card" style={{ maxWidth: 600, textAlign: 'center' }}>
        <div className="confirmation-icon">✅</div>
        <h2>We've Got Your Response!</h2>
        <p>
          Thank you for taking the time to RSVP for our special day. 
          We're excited to celebrate with you!
        </p>
        
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