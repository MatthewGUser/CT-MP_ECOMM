import React from 'react';
import { useParams } from 'react-router-dom';
import UpdateCustomerForm from '../components/customers/UpdateCustomerForm';
import '../styles/Form.css';

const UpdateCustomerPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Update Customer</h1>
      <UpdateCustomerForm customerId={id} />
    </div>
  );
};

export default UpdateCustomerPage;