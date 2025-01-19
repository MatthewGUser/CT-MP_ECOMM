import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text  # Import text for raw SQL queries

# User-defined database configuration
DB_HOST = "localhost"  # Replace with your database host
DB_USER = "root"       # Replace with your database user
DB_PASSWORD = ""       # Replace with your database password
DB_NAME = "ecomm"      # Replace with your database name
PORT = 3000            # Replace with your desired port

# Print the database configuration for debugging
print("Loaded configuration:")
print(f"DB_HOST: {DB_HOST}")
print(f"DB_USER: {DB_USER}")
print(f"DB_PASSWORD: {DB_PASSWORD}")
print(f"DB_NAME: {DB_NAME}")
print(f"PORT: {PORT}")

# Create Flask app
app = Flask(__name__)

# Configure the SQLAlchemy database URI
app.config['SQLALCHEMY_DATABASE_URI'] = (
    f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Print the database URI for debugging
print("Database URI:", app.config['SQLALCHEMY_DATABASE_URI'])

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Test the connection and show tables
with app.app_context():
    try:
        with db.engine.connect() as connection:
            result = connection.execute(text('SHOW TABLES'))  # Use text() for raw SQL
            tables = result.fetchall()
            if tables:
                print('Tables in the database:')
                for table in tables:
                    print(table[0])
            else:
                print('No tables found in the database.')
    except Exception as e:
        print('Error connecting to the database:', e)
