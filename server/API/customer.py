from flask import Blueprint, request, jsonify
from server.db import db
from server.models.customer import Customer
from sqlalchemy.exc import SQLAlchemyError

customer_bp = Blueprint('customer_bp', __name__)

@customer_bp.route('/customers', methods=['GET'])
def get_all_customers():
    try:
        customers = Customer.query.all()
        return jsonify([customer.to_dict() for customer in customers]), 200
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

@customer_bp.route('/customers/<int:id>', methods=['GET'])
def get_customer_by_id(id):
    try:
        customer = Customer.query.get_or_404(id)
        return jsonify(customer.to_dict()), 200
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

@customer_bp.route('/customers', methods=['POST'])
def create_customer():
    data = request.get_json()
    new_customer = Customer(**data)
    try:
        db.session.add(new_customer)
        db.session.commit()
        return jsonify(new_customer.to_dict()), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@customer_bp.route('/customers/<int:id>', methods=['PUT'])
def update_customer(id):
    data = request.get_json()
    customer = Customer.query.get_or_404(id)
    for key, value in data.items():
        setattr(customer, key, value)
    try:
        db.session.commit()
        return jsonify(customer.to_dict()), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@customer_bp.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    customer = Customer.query.get_or_404(id)
    try:
        db.session.delete(customer)
        db.session.commit()
        return jsonify({'message': 'Customer deleted successfully'}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500