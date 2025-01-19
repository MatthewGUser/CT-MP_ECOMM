import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateProductForm from '../components/products/UpdateProductForm';
import '../styles/Form.css';

const UpdateProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Update Product</h1>
      <UpdateProductForm productId={id} />
    </div>
  );
};

export default UpdateProductPage;