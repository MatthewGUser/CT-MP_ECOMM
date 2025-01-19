from flask import Flask, jsonify
from flask_cors import CORS
from server.db import db
from server.API.customer import customer_bp
from server.API.order import order_bp
from server.API.product import product_bp

# Import models to ensure they are registered with SQLAlchemy
from server.models.customer import Customer
from server.models.product import Product
from server.models.order import Order

app = Flask(__name__)
CORS(app)  # Enable CORS
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Update with your database URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(customer_bp)
app.register_blueprint(order_bp)
app.register_blueprint(product_bp)

@app.route('/api/check-db', methods=['GET'])
def check_db():
    try:
        # Check if tables exist
        tables = {
            'customers': db.engine.dialect.has_table(db.engine, 'customers'),
            'products': db.engine.dialect.has_table(db.engine, 'products'),
            'orders': db.engine.dialect.has_table(db.engine, 'orders')
        }
        return jsonify({'connected': True, 'tables': tables}), 200
    except Exception as e:
        return jsonify({'connected': False, 'error': str(e)}), 500

def create_tables():
    with app.app_context():
        db.create_all()

if __name__ == '__main__':
    create_tables()
    app.run(debug=True)