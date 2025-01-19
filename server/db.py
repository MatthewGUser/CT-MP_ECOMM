import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

# User-defined database configuration
DB_HOST = "localhost"  # Replace with your database host
DB_USER = "root"       # Replace with your database user
DB_PASSWORD = ""       # Replace with your database password
DB_NAME = "ecomm"      # Replace with your database name

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Import models to ensure they are registered with SQLAlchemy
from server.models.customer import Customer
from server.models.product import Product
from server.models.order import Order

# Test the connection
with app.app_context():
    try:
        with db.engine.connect() as connection:
            connection.execute(text('SELECT 1'))
        print('Connected to the MySQL database.')
    except Exception as e:
        print('Error connecting to the database:', e)