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

const Info = () => (
  <div className="info-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: 'var(--ivory)', position: 'relative' }}>
    <div className="page-header" style={{ textAlign: 'center', maxWidth: 700, position: 'relative' }}>
      <h1 style={{ color: 'var(--red)', fontFamily: 'var(--font-heading)' }}>Guest Information & FAQ</h1>
      <p style={{ color: 'var(--red)', fontWeight: 600 }}>Everything you need to know for your trip to Uông Bí, Việt Nam</p>
      <LotusSVG />
    </div>
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>Venue</h2>
      <p><strong>Dương Gia Palace</strong></p>
      <p>168, Ngõ 59 Trần Hưng Đạo, Yên Thanh, Uông Bí, Quảng Ninh, Vietnam</p>
      <iframe title="Venue Map" src="https://www.google.com/maps?q=Duong+Gia+Palace,+Uong+Bi,+Vietnam&output=embed" width="100%" height="250" style={{ border: 0, borderRadius: '8px' }} allowFullScreen="" loading="lazy"></iframe>
    </div>
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>Hotel</h2>
      <p><strong>Khách Sạn Luffy</strong> (special rates for wedding guests)</p>
      <p>26 Trần Hưng Đạo, Thanh Sơn, Uông Bí, Quảng Ninh, Vietnam</p>
      <p>Just 400m (6 min walk) from Dương Gia Palace</p>
      <iframe title="Hotel Map" src="https://www.google.com/maps?q=Khach+San+Luffy,+Uong+Bi,+Vietnam&output=embed" width="100%" height="250" style={{ border: 0, borderRadius: '8px' }} allowFullScreen="" loading="lazy"></iframe>
    </div>
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>Dress Code</h2>
      <ul>
        <li><strong>Saturday Ceremony:</strong> Traditional "ao dai"</li>
        <li><strong>Sunday Wedding:</strong> Men in suit, women in formal dress</li>
      </ul>
    </div>
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>About Uông Bí</h2>
      <p>
        Uông Bí City is a peaceful town in Quảng Ninh Province, Northern Vietnam, surrounded by mountains and spiritual heritage. It's the gateway to some of the country's most beautiful landmarks:
      </p>
      <ul>
        <li>⛰️ <strong>Yên Tử Mountain</strong> – a sacred site for Vietnamese Buddhism</li>
        <li>🏯 <strong>Ba Vàng Pagoda</strong> – nestled on a quiet hillside with stunning views</li>
        <li>🌊 <strong>Hạ Long Bay</strong> – breathtaking scenery just over an hour away</li>
      </ul>
      <p>
        Whether you’re here for the celebration, the culture, or the scenery, we hope Uông Bí gives you a warm and memorable welcome to Vietnam.
      </p>
    </div>
    <div className="card" style={{ maxWidth: 700 }}>
      <h2>Travel Tips</h2>
      <ul>
        <li>Airport: Noi Bai International Airport (HAN), Hanoi</li>
        <li>Transport: Private car, taxi, or bus to Uông Bí (approx. 2 hours from Hanoi)</li>
        <li>Currency: Vietnamese Dong (VND)</li>
        <li>Weather: November is cool and dry, perfect for sightseeing</li>
      </ul>
    </div>
    <div className="card" style={{ maxWidth: 700, textAlign: 'center' }}>
      <h3>Questions?</h3>
      <p>Contact Jasper & Trang: <br />📧 <a href="mailto:jasper.e.karlen@gmail.com">jasper.e.karlen@gmail.com</a></p>
    </div>
  </div>
);

export default Info; 