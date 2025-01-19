import React from 'react';

const DeleteProduct = ({ id, onDelete }) => {
  const handleDelete = () => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          onDelete(id);
        } else {
          console.error('Error deleting product');
        }
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default DeleteProduct;