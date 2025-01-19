import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCustomerForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the customer data to populate the form
    fetch(`http://localhost:5000/customers/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setName(data.name);
          setEmail(data.email);
          setPhone(data.phone);
        }
      })
      .catch(error => {
        console.error('Error fetching customer data:', error);
        setError('Error fetching customer data. Please try again.');
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous error message
    setError('');

    // Basic validation checks
    if (!name || !email || !phone) {
      setError('All fields are required.');
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Phone number validation (simple format: (XXX) XXX-XXXX or XXX-XXX-XXXX)
    const phoneRegex = /^(\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number in the format (XXX) XXX-XXXX or XXX-XXX-XXXX.');
      return;
    }

    const updatedCustomer = { name, email, phone };

    // Make the API request to update the customer
    fetch(`http://localhost:5000/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          navigate('/'); // Navigate back to the Home page after successful update
        }
      })
      .catch(error => {
        console.error('Error updating customer:', error);
        setError('Error updating customer. Please try again.');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
};

export default UpdateCustomerForm;