import React from 'react';

const images = [
  { src: '/gallery1.jpg', alt: 'Jasper and Trang at Ha Long Bay' },
  { src: '/gallery2.jpg', alt: 'Engagement photo' },
  { src: '/gallery3.jpg', alt: 'Family celebration' },
  { src: '/invite-card.jpg', alt: 'Wedding invitation card' },
];

const Gallery = () => (
  <div className="gallery-page" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div className="page-header" style={{ textAlign: 'center', maxWidth: 700 }}>
      <h1>Gallery</h1>
      <p>A few special moments and our invitation</p>
    </div>
    <div className="gallery-grid">
      {images.map((img, i) => (
        <div className="gallery-item" key={i}>
          <img src={img.src} alt={img.alt} className="gallery-img" />
          <div className="gallery-caption">{img.alt}</div>
        </div>
      ))}
    </div>
  </div>
);

export default Gallery; 