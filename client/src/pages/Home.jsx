import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const Home = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));

    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCreateCustomer = () => {
    navigate('/create-customer');
  };

  const handleEditCustomer = (id) => {
    navigate(`/update-customer/${id}`);
  };

  const handleDeleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      fetch(`http://localhost:5000/customers/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setCustomers(customers.filter(customer => customer.id !== id));
          } else {
            console.error('Error deleting customer');
          }
        })
        .catch(error => console.error('Error deleting customer:', error));
    }
  };

  const handleCreateProduct = () => {
    navigate('/create-product');
  };

  const handleEditProduct = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setProducts(products.filter(product => product.id !== id));
          } else {
            console.error('Error deleting product');
          }
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  const handleGoToShop = (customerId) => {
    navigate('/shop', { state: { customerId } });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Customer List</h2>
        <div className="button-container">
          <button onClick={handleCreateCustomer}>Create Customer</button>
        </div>
        <ul>
          {customers.map(customer => (
            <li key={customer.id}>
              <span>{customer.name} - {customer.email} - {customer.phone}</span>
              <div>
                <button onClick={() => handleEditCustomer(customer.id)}>Edit</button>
                <button onClick={() => handleDeleteCustomer(customer.id)}>Delete</button>
                <button onClick={() => handleGoToShop(customer.id)}>Go to Shop</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <h2>Product List</h2>
        <div className="button-container">
          <button onClick={handleCreateProduct}>Create Product</button>
        </div>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <span>{product.name} - {product.description} - ${product.price}</span>
              <div>
                <button onClick={() => handleEditProduct(product.id)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;