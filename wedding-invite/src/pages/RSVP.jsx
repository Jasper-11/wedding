import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const guestList = [
  'Wayne', 'Donetta', 'Nerida', 'Robert', 'Ashley',
  'Alan', 'Scott', 'Daniel', 'Erik', 'Stef',
  'Aaron', 'Elliot', 'Terry', 'Kasey', 'Brooke',
  'Peter', 'Joe'
];

const RSVP = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    attendance: '',
    dietaryRestrictions: '',
    questions: '',
    plusOne: false,
    plusOneName: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validateGuest = (firstName) => {
    return guestList.some(
      guest => guest.trim().toLowerCase() === firstName.trim().toLowerCase()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const newErrors = {};

    // Validate required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!validateGuest(formData.firstName)) {
      newErrors.firstName = 'Sorry, we could not find your name on our guest list.';
    }
    if (!formData.attendance) {
      newErrors.attendance = 'Please select your attendance';
    }
    if (formData.plusOne && !formData.plusOneName.trim()) {
      newErrors.plusOneName = 'Please enter your guest’s first name';
    }
    // Prevent duplicate RSVP (client-side, best effort)
    // (Server will enforce as well)

    if (Object.keys(newErrors).length === 0) {
      setSubmitting(true);
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://rsvplist.onrender.com';
        const response = await fetch(`${API_URL}/api/rsvp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.firstName.trim(),
            plusOne: formData.plusOne ? formData.plusOneName.trim() : '',
            attending: formData.attendance === 'yes',
            guests: formData.plusOne ? 2 : 1,
            dietary: formData.dietaryRestrictions,
            message: formData.questions
          })
        });
        if (response.ok) {
          navigate('/confirmation', {
            state: {
              attending: formData.attendance === 'yes',
              name: formData.firstName.trim(),
              plusOne: formData.plusOne ? formData.plusOneName.trim() : ''
            }
          });
        } else {
          setSubmitError('There was a problem submitting your RSVP. Please try again later.');
        }
      } catch (err) {
        setSubmitError('There was a problem submitting your RSVP. Please try again later.');
      } finally {
        setSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="rsvp-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: 'var(--ivory)', position: 'relative' }}>
      <div className="page-header" style={{ textAlign: 'center', maxWidth: 600, position: 'relative' }}>
        <h1 style={{ color: 'var(--red)', fontFamily: 'var(--font-heading)' }}>RSVP</h1>
        <p style={{ color: 'var(--red)', fontWeight: 600 }}>Please respond by October 15, 2025</p>
        <LotusSVG />
      </div>
      <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="form-group">
            <label htmlFor="firstName">Your First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
              disabled={submitting}
              autoComplete="given-name"
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="attendance">Will you attend? *</label>
            <select
              id="attendance"
              name="attendance"
              value={formData.attendance}
              onChange={handleChange}
              className={errors.attendance ? 'error' : ''}
              disabled={submitting}
            >
              <option value="">Please select...</option>
              <option value="yes">Yes, I will attend</option>
              <option value="no">No, I cannot attend</option>
            </select>
            {errors.attendance && <span className="error-message">{errors.attendance}</span>}
          </div>

          {formData.attendance === 'yes' && (
            <>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="plusOne"
                    checked={formData.plusOne}
                    onChange={handleChange}
                    disabled={submitting}
                  />{' '}
                  I will bring a +1
                </label>
              </div>
              {formData.plusOne && (
                <div className="form-group">
                  <label htmlFor="plusOneName">+1 First Name *</label>
                  <input
                    type="text"
                    id="plusOneName"
                    name="plusOneName"
                    value={formData.plusOneName}
                    onChange={handleChange}
                    className={errors.plusOneName ? 'error' : ''}
                    disabled={submitting}
                    autoComplete="off"
                  />
                  {errors.plusOneName && <span className="error-message">{errors.plusOneName}</span>}
                </div>
              )}
              <div className="form-group">
                <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  placeholder="Please let us know if you or your +1 have any dietary restrictions or allergies..."
                  rows="3"
                  disabled={submitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="questions">Questions or Special Requests</label>
                <textarea
                  id="questions"
                  name="questions"
                  value={formData.questions}
                  onChange={handleChange}
                  placeholder="Any questions about the wedding or special requests..."
                  rows="4"
                  disabled={submitting}
                />
              </div>
            </>
          )}

          {submitError && <div className="error-message" style={{ marginBottom: '1rem' }}>{submitError}</div>}

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit RSVP'}
          </button>
        </form>
      </div>
      <div className="card" style={{ maxWidth: 600, margin: '2rem auto', textAlign: 'center' }}>
        <h3>Need Help?</h3>
        <p>If you have any issues with your RSVP or need to make changes, please contact us:</p>
        <p>📧 <a href="mailto:jasper.e.karlen@gmail.com">jasper.e.karlen@gmail.com</a></p>
      </div>
    </div>
  );
};

export default RSVP; 