import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

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

    const updatedProduct = { name, description, price };

    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          navigate('/'); // Navigate back to the Home page after 2 seconds
        }, 0);
      })
      .catch(error => {
        console.error('Error updating product:', error);
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
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;