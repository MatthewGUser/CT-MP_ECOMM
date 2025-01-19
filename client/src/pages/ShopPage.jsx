import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import OrderList from '../components/orders/OrderList';
import ShopProductList from '../components/products/ShopProductList';
import '../styles/Shop.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const customerId = location.state?.customerId || 0;

  // Fetch cart items function for reuse
  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/orders/customer/${customerId}`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }, [customerId]);

  useEffect(() => {
    if (!customerId) {
      alert('No customer selected. Returning to home page.');
      navigate('/');
      return;
    }

    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        // Fetch customer data
        const customerResponse = await fetch(`http://localhost:5000/customers/${customerId}`);
        const customerData = await customerResponse.json();

        if (customerData.error) {
          console.error('Error fetching customer data:', customerData.error);
          alert('Customer not found. Returning to home page.');
          navigate('/');
          return;
        }
        setCustomer(customerData);

        // Fetch products
        const productsResponse = await fetch('http://localhost:5000/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch initial cart items
        await fetchCartItems();
      } catch (error) {
        console.error('Error fetching initial data:', error);
        alert('Error fetching data. Returning to home page.');
        navigate('/');
      }
    };

    fetchInitialData();
  }, [customerId, navigate, fetchCartItems]);

  const addToCart = async (product) => {
    if (!product || !product.id) {
      console.error('Invalid product data:', product);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          product_id: product.id,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error adding to cart:', data.error);
        alert('Failed to add item to cart.');
        return;
      }

      // Fetch updated cart items after successful addition
      await fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again later.');
    }
  };

  const updateQuantity = async (orderId, quantity) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error updating quantity:', data.error);
        return;
      }

      // Fetch updated cart items after successful update
      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.error) {
        console.error('Error removing from cart:', data.error);
        return;
      }

      // Fetch updated cart items after successful removal
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to the Shop</h1>
        <button onClick={handleGoHome}>Return to Home</button>

        {customer && (
          <div className="customer-info">
            <h2>Welcome, {customer.name}</h2>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
          </div>
        )}

        <OrderList
          orders={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />

        <ShopProductList
          products={products}
          addToCart={addToCart}
        />
      </div>
    </div>
  );
};

export default ShopPage;