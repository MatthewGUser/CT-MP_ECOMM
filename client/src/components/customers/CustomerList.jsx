import React, { useEffect, useState } from 'react';
import UpdateCustomerForm from './UpdateCustomerForm';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Fetch customers from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/customers');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };
    fetchCustomers();
  }, []);

  // Delete customer
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/customers/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCustomers(customers.filter((customer) => customer.id !== id));
      } else {
        console.error('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  // Update customer state after edit
  const handleCustomerUpdated = (updatedCustomer) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
    setEditingCustomer(null);
  };

  return (
    <div>
      <h2>Customer List</h2>
      {editingCustomer ? (
        <UpdateCustomerForm
          customer={editingCustomer}
          onCustomerUpdated={handleCustomerUpdated}
        />
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.name} - {customer.email} - {customer.phone}
              <button onClick={() => setEditingCustomer(customer)}>Edit</button>
              <button onClick={() => handleDelete(customer.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;