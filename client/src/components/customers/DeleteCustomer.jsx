import React from 'react';

const DeleteCustomer = ({ id, onDelete }) => {
  const handleDelete = () => {
    fetch(`http://localhost:5000/customers/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          onDelete(id);
        } else {
          console.error('Error deleting customer');
        }
      })
      .catch(error => console.error('Error deleting customer:', error));
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteCustomer;