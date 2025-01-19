import React, { useEffect, useState } from 'react';
import '../../styles/Shop.css';

const OrderList = ({ orders, removeFromCart, updateQuantity }) => {
  const [groupedOrders, setGroupedOrders] = useState([]);

  useEffect(() => {
    // Group orders by product_id and sum up quantities
    const updatedOrders = orders.reduce((acc, order) => {
      // Use product_id as the key for finding existing orders
      const existingOrderIndex = acc.findIndex(item =>
        item.product_id === order.product_id || item.id === order.product_id
      );

      if (existingOrderIndex >= 0) {
        // Update existing order
        acc[existingOrderIndex] = {
          ...acc[existingOrderIndex],
          quantity: (acc[existingOrderIndex].quantity || 0) + (order.quantity || 1)
        };
      } else {
        // Add new order, ensuring all necessary fields are present
        acc.push({
          ...order,
          product_id: order.product_id || order.id, // Handle both product_id and id
          order_id: order.id, // Use the actual order ID
          quantity: order.quantity || 1
        });
      }
      return acc;
    }, []);

    setGroupedOrders(updatedOrders);
  }, [orders]);

  const handleQuantityChange = (order_id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(order_id);
    } else {
      updateQuantity(order_id, newQuantity);

      setGroupedOrders(prevOrders =>
        prevOrders.map(order =>
          order.order_id === order_id ? { ...order, quantity: newQuantity } : order
        )
      );
    }
  };

  return (
    <div className="order-list">
      <h2>Your Cart</h2>
      {groupedOrders.length === 0 ? (
        <p>Your cart is empty. Add some products!</p>
      ) : (
        <ul>
          {groupedOrders.map((order) => (
            <li key={order.order_id}>
              <div className="item-details">
                <strong>{order.product_name}</strong>
                <p>{order.product_description}</p>
                <span>${order.product_price}</span>

                <div className="quantity-container">
                  <button
                    onClick={() => handleQuantityChange(order.order_id, order.quantity - 1)}
                    disabled={order.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={order.quantity}
                    onChange={(e) => handleQuantityChange(order.order_id, parseInt(e.target.value) || 1)}
                  />
                  <button
                    onClick={() => handleQuantityChange(order.order_id, order.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(order.order_id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;