import React from 'react';
import CountdownTimer from '../components/CountdownTimer';

const Home = () => {
  return (
    <div className="home-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      {/* Hero Section */}
      <div className="hero-section" style={{ width: '100%', maxWidth: 700, textAlign: 'center' }}>
        <div className="hero-content">
          <h1 className="hero-title">Jasper Everett Karlen & Trang Bui Thi Hai</h1>
          <p className="hero-subtitle">Are getting married</p>
          <div className="hero-date">
            <span className="date-day">Sunday</span>
            <span className="date-month">November</span>
            <span className="date-number">2</span>
            <span className="date-year">2025</span>
          </div>
          <p className="hero-location">📍 Dương Gia Palace, Uông Bí City, Việt Nam</p>
        </div>
      </div>

      {/* Countdown Timer */}
      <CountdownTimer />

      {/* Our Story Section */}
      <div className="card our-story-card" style={{ maxWidth: 700, margin: '2rem auto', textAlign: 'center' }}>
        <h2>Our Story</h2>
        <p style={{ fontWeight: 'bold', color: '#7b1fa2', fontSize: '1.2em' }}>
          Our story began in Melbourne in mid 2022, just as the world was opening back up. We both found ourselves in a new city, navigating fresh starts and newfound freedom after lockdowns. Somehow, we also found each other.
        </p>
        <img src="/couple-photo.jpg" alt="Jasper and Trang" style={{ maxWidth: '350px', display: 'block', margin: '2rem auto', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }} />
        <p>
          Jasper was struck by her unique charm and enamoured with her curiosity. Trang was drawn to his smile and kind nature, and from our first few conversations, something genuine began to grow between us. <span role="img" aria-label="smile">😊</span>
        </p>
        <p>
          From wandering Melbourne’s laneways and road-tripping around Victoria to relaxing on the beaches of Fiji, skiing through the snowfields of Korea, and exploring the vibrant culture, food, and family life of Vietnam, our journey has been filled with adventure, laughter, and love. These are the things we look forward to continuing to nurture together.
        </p>
        <p>
          We’re so excited to take the next step and celebrate our wedding with the people who mean the most to us.
        </p>
        <p>
          Thank you for making the journey to be part of this special moment in our lives.
        </p>
        <p style={{ fontWeight: 'bold', color: 'green', fontSize: '1.1em' }}>
          We can’t wait to celebrate with you!
        </p>
        <div style={{ marginTop: '2rem', color: '#888', fontSize: '1em' }}>
          Contact: <a href="mailto:jasper.e.karlen@gmail.com">jasper.e.karlen@gmail.com</a>
        </div>
      </div>
    </div>
  );
};

export default Home; 