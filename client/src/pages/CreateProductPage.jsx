import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset previous error message
    setError('');

    // Basic validation checks
    if (!name || !description || !price) {
      setError('All fields are required.');
      return;
    }

    // Validate price to be a positive number
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid price (greater than 0).');
      return;
    }

    const newProduct = { name, description, price };

    // Make the API request to create the product
    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          navigate('/'); // Navigate back to the Home page after successful creation
        }
      })
      .catch(error => {
        console.error('Error creating product:', error);
        setError('Error creating product. Please try again.');
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
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProductForm;