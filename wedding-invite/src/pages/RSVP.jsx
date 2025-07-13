import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RSVP = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    attendance: '',
    dietaryRestrictions: '',
    questions: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Sample guest list - you can replace this with your actual guest list
  const guestList = [
    { firstName: 'John', lastName: 'Smith' },
    { firstName: 'Jane', lastName: 'Doe' },
    { firstName: 'Mike', lastName: 'Johnson' },
    { firstName: 'Trang', lastName: 'Bui' },
    { firstName: 'Jasper', lastName: 'Karlen' },
    { firstName: 'David', lastName: 'Brown' },
    { firstName: 'Emily', lastName: 'Davis' },
    { firstName: 'Robert', lastName: 'Miller' },
    { firstName: 'Lisa', lastName: 'Wilson' }
  ];

  const validateGuest = (firstName, lastName) => {
    return guestList.some(guest => 
      guest.firstName.toLowerCase() === firstName.toLowerCase() && 
      guest.lastName.toLowerCase() === lastName.toLowerCase()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const newErrors = {};

    // Validate required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.attendance) {
      newErrors.attendance = 'Please select your attendance';
    }

    // Validate guest is on the list
    if (formData.firstName && formData.lastName) {
      if (!validateGuest(formData.firstName, formData.lastName)) {
        newErrors.guest = 'Sorry, we could not find your name on our guest list. Please contact us if you believe this is an error.';
      }
    }

    if (Object.keys(newErrors).length === 0) {
      setSubmitting(true);
      try {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            attending: formData.attendance === 'yes',
            guests: 1,
            dietary: formData.dietaryRestrictions,
            message: formData.questions
          })
        });
        if (response.ok) {
          navigate('/confirmation', { 
            state: { 
              attending: formData.attendance === 'yes',
              name: `${formData.firstName} ${formData.lastName}`
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
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
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'error' : ''}
              disabled={submitting}
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'error' : ''}
              disabled={submitting}
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>

          {errors.guest && (
            <div className="error-message guest-error">
              {errors.guest}
            </div>
          )}

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
                <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
                <textarea
                  id="dietaryRestrictions"
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  placeholder="Please let us know if you have any dietary restrictions or allergies..."
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