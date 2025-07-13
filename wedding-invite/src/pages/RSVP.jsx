import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="rsvp-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="page-header" style={{ textAlign: 'center', maxWidth: 600 }}>
        <h1>RSVP</h1>
        <p>Please respond by October 15, 2025</p>
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