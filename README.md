# E-Commerce App

This is a React-based E-Commerce application. The app allows customers to browse products, add them to a shopping cart, and place orders. It utilizes context for managing customer, product, and order states.

## Overview
The E-Commerce App allows users to:
- Create and manage customer profiles
- Browse products and add them to a cart
- View and manage their cart
- Place orders
- Manage products and customer information

The app uses React Context API for state management and localStorage to persist cart data across sessions.

It is the extension to the previous E-Commerce project
https://github.com/MatthewGUser/CT-MP_E-Commerce

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Python (v3.8 or higher)
- MySQL

### Steps
1. Clone the repo

`git clone https://github.com/MatthewGUser/CT-MP_ECOMM.git`

2. Navigate into the project directory:
```
cd CT-MP_ECOMM
```

3. Fill in the expected information in the `server/db.py` file:
```
DB_HOST = "localhost"  # Replace with your database host
DB_USER = "root"       # Replace with your database user
DB_PASSWORD = ""       # Replace with your database password
DB_NAME = "ecomm"      # Replace with your database name
```

4. Initialize the database:
```
flask db init
flask db migrate -m "Initial migration."
flask db upgrade
```

5. Start the Flask server:
```
flask run
```

6. Navigate to the `client` directory and install npm dependencies:
```
cd client
npm install
```

7. Start the React development server:
```
npm start
```

## File Structure
```
e-commerce-app/
  node-modules/              # npm packages
  public/                    # Public assets (images, index.html)
  src/
    components/              # React components for different sections
      customers/              # Components related to customer management
        CreateCustomerForm.jsx  # Form for creating a new customer
        CustomerList.jsx        # Display list of customers
        DeleteCustomer.jsx      # Component for deleting a customer
        UpdateCustomerForm.jsx  # Form for updating an existing customer
      orders/                 # Components related to order management
        OrderList.jsx         # Display list of orders
      products/               # Components related to product management
        CreateProductForm.jsx  # Form for creating a new product
        DeleteProduct.jsx      # Component for deleting a product
        ProductList.jsx        # Display list of products
        ShopProductList.jsx    # Display list of products in the shop
        UpdateProductForm.jsx  # Form for updating an existing product
    pages/                    # Pages for routing
      NotFound.jsx            # 404 Error page
      CreateCustomerForm.jsx  # Form for creating a new customer
      CreateProductForm.jsx   # Form for creating a new product
      EditCustomerForm.jsx    # Form for editing an existing customer
      EditProductForm.jsx     # Form for editing an existing product
      Home.jsx                # Home page
      ShopPage.jsx            # Shop page (with shopping cart functionality)
    styles/                   # CSS styles for the app
      NotFound.css            # Styles for 404 page
      Form.css                # General form styles
      HomePage.css            # Styles for Home page
      Shop.css                # Styles for the Shop page
    index.css                 # Global styles
    App.css                   # Main app styles
    App.js                    # Main app component
    index.js                  # Entry point for React app
    logo.svg                  # Logo image
    reportWebVitals.js        # Web vitals reporting
    setupTests.js             # Setup for tests
  server/                     # Server-side code
    __init__.py               # Initialization for the server package
    app.py                    # Main Flask application
    db.py                     # Database connection and setup
    schemas/                  # Directory for schema definitions
      __init__.py             # Initialization for the schemas package
      schemas.py              # Schema definitions for validation
    models/                   # Directory for database models
      __init__.py             # Initialization for the models package
      customer.py             # Customer model
      order.py                # Order model
      product.py              # Product model
    API/                      # Directory for API routes
      __init__.py             # Initialization for the API package
      customer.py             # Customer API routes
      order.py                # Order API routes
      product.py              # Product API routes
  .env                        # Environment variables
  README.md                   # Project documentation
```
## Features
* Customer Management: Add, edit, and view customer profiles.
* Product Management: View available products, add new products, and edit existing ones.
* Shopping Cart: Add and remove items from the cart, change item quantities, and view total price.
* Order Management: Place an order and view order history.
* Persistent Cart: Cart data is stored in localStorage and tied to a unique customerId for each customer.

## Technologies Used
* React: Front-end JavaScript library for building user interfaces.
* React Router: For handling routing and navigation.
* React Context API: For managing global state (customers, orders, products, and cart).
* CSS: For styling the application.
* Node.js: For the server-side code.
* MySQL: Database for storing customer, product, and order data.
* Flask: Web framework for Python.
* SQLAlchemy: ORM for database interactions.
## Getting Started
* Run the app: After installing dependencies, run the app locally using `npm start` for both client and server.
* Create Customer Profiles: Users can create new customer profiles from the `CreateCustomerForm.jsx` page.
Add Products: Admins can add new products via `CreateProductForm.jsx`.
Shop for Products: Navigate to the `ShopPage.jsx` page, browse products, add them to the cart, and view the cart with the option to checkout.
Manage Orders: Once a customer places an order, it will be stored and viewable in the `Shop.jsx` page.

## Summary

The E-Commerce App is a React-based application designed to manage customers, products, and orders for an online store. Users can create and manage customer profiles, browse products, add items to a shopping cart, place orders, and view order history. The app uses the React Context API for state management and persists cart data in localStorage, making the shopping experience seamless even across sessions. The app also includes features for admins to manage products and customer details.