import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2025-11-02T11:00:00+07:00'); // 11 AM Vietnam time

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: '60px',
      margin: '0 8px'
    }}>
      <div style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#8B0000',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        fontFamily: 'Georgia, serif'
      }}>
        {value.toString().padStart(2, '0')}
      </div>
      <div style={{
        fontSize: '0.9rem',
        color: '#666',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginTop: '4px'
      }}>
        {label}
      </div>
    </div>
  );

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f5f5dc 0%, #fff8dc 100%)',
      borderRadius: '16px',
      padding: '2rem',
      margin: '2rem auto',
      maxWidth: '600px',
      textAlign: 'center',
      boxShadow: '0 8px 32px rgba(139, 0, 0, 0.1)',
      border: '2px solid #8B0000'
    }}>
      <h3 style={{
        color: '#8B0000',
        marginBottom: '1.5rem',
        fontSize: '1.5rem',
        fontFamily: 'Georgia, serif'
      }}>
        🎉 Counting Down to Our Special Day 🎉
      </h3>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <TimeUnit value={timeLeft.days} label="Days" />
        <div style={{ fontSize: '2rem', color: '#8B0000', fontWeight: 'bold' }}>:</div>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <div style={{ fontSize: '2rem', color: '#8B0000', fontWeight: 'bold' }}>:</div>
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <div style={{ fontSize: '2rem', color: '#8B0000', fontWeight: 'bold' }}>:</div>
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
      
      <p style={{
        marginTop: '1.5rem',
        color: '#666',
        fontSize: '1rem',
        fontStyle: 'italic'
      }}>
        Until we say "I do" 💕
      </p>
    </div>
  );
};

export default CountdownTimer; 