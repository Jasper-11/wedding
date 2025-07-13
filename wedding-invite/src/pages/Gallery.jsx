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

const images = [
  { src: '/gallery1.jpg', alt: 'Jasper and Trang at Ha Long Bay' },
  { src: '/gallery2.jpg', alt: 'Engagement photo' },
  { src: '/gallery3.jpg', alt: 'Family celebration' },
  { src: '/invite-card.jpg', alt: 'Wedding invitation card' },
];

const Gallery = () => (
  <div className="gallery-page" style={{ width: '100%', minHeight: '80vh', background: 'var(--ivory)', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
    <div className="page-header" style={{ textAlign: 'center', maxWidth: 700, position: 'relative' }}>
      <h1 style={{ color: 'var(--red)', fontFamily: 'var(--font-heading)' }}>Gallery</h1>
      <p style={{ color: 'var(--red)', fontWeight: 600 }}>A few special moments and our invitation</p>
      <LotusSVG />
    </div>
    <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: 900, width: '100%', margin: '2rem auto' }}>
      {images.map((img, i) => (
        <div className="gallery-item card" key={i} style={{ padding: 0, overflow: 'hidden', background: 'var(--cream)' }}>
          <img src={img.src} alt={img.alt} className="gallery-img" style={{ width: '100%', borderRadius: '12px 12px 0 0', objectFit: 'cover', maxHeight: 220 }} />
          <div className="gallery-caption" style={{ padding: '1rem', color: 'var(--red)', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>{img.alt}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Gallery; 