import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShopPage from './pages/ShopPage';
import CreateCustomerPage from './pages/CreateCustomerPage';
import UpdateCustomerPage from './pages/UpdateCustomerPage';
import CreateProductPage from './pages/CreateProductPage';
import UpdateProductPage from './pages/UpdateProductPage';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  console.log('App component is rendering');

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Management App</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-customer" element={<CreateCustomerPage />} />
            <Route path="/update-customer/:id" element={<UpdateCustomerPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
            <Route path="/update-product/:id" element={<UpdateProductPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;