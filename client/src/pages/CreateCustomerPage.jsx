import React from 'react';
import CreateCustomerForm from '../components/customers/CreateCustomerForm';
import '../styles/Form.css';

const CreateCustomerPage = () => {
  return (
    <div>
      <h1>Create Customer</h1>
      <CreateCustomerForm />
    </div>
  );
};

export default CreateCustomerPage;