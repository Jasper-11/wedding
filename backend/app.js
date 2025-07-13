const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// RSVP data file
const RSVP_FILE = path.join(__dirname, 'rsvp-data.json');

// Initialize RSVP data file if it doesn't exist
if (!fs.existsSync(RSVP_FILE)) {
  fs.writeFileSync(RSVP_FILE, JSON.stringify([], null, 2));
}

// Routes
app.get('/api/rsvp', (req, res) => {
  try {
    const data = fs.readFileSync(RSVP_FILE, 'utf8');
    const rsvps = JSON.parse(data);
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read RSVP data' });
  }
});

app.post('/api/rsvp', (req, res) => {
  try {
    const { name, attending, guests, dietary, message } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const data = fs.readFileSync(RSVP_FILE, 'utf8');
    const rsvps = JSON.parse(data);
    
    // Check if RSVP already exists for this name
    const existingIndex = rsvps.findIndex(rsvp => rsvp.name === name);
    
    const rsvpData = {
      name,
      attending,
      guests: guests || 1,
      dietary: dietary || '',
      message: message || '',
      timestamp: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      rsvps[existingIndex] = rsvpData;
    } else {
      rsvps.push(rsvpData);
    }

    fs.writeFileSync(RSVP_FILE, JSON.stringify(rsvps, null, 2));
    res.json({ success: true, message: 'RSVP submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save RSVP' });
  }
});

app.get('/api/admin/rsvp', (req, res) => {
  const { password } = req.query;
  
  if (password !== 'admin123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const data = fs.readFileSync(RSVP_FILE, 'utf8');
    const rsvps = JSON.parse(data);
    res.json(rsvps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read RSVP data' });
  }
});

app.get('/api/admin/export', (req, res) => {
  const { password } = req.query;
  
  if (password !== 'admin123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const data = fs.readFileSync(RSVP_FILE, 'utf8');
    const rsvps = JSON.parse(data);
    
    const csv = [
      'Name,Attending,Guests,Dietary Restrictions,Message,Timestamp',
      ...rsvps.map(rsvp => 
        `"${rsvp.name}","${rsvp.attending}","${rsvp.guests}","${rsvp.dietary}","${rsvp.message}","${rsvp.timestamp}"`
      )
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="rsvp-data.csv"');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Failed to export RSVP data' });
  }
});

// API-only backend - return 404 for non-API routes
app.get('*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app; 