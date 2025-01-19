from flask import Blueprint, request, jsonify
from server.db import db
from server.models.order import Order
from server.models.product import Product
from sqlalchemy.exc import SQLAlchemyError

order_bp = Blueprint('order_bp', __name__)

@order_bp.route('/orders', methods=['GET'])
def get_all_orders():
    try:
        orders = Order.query.all()
        return jsonify([order.to_dict() for order in orders]), 200
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

@order_bp.route('/orders/<int:id>', methods=['GET'])
def get_order_by_id(id):
    try:
        order = Order.query.get_or_404(id)
        return jsonify(order.to_dict()), 200
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

@order_bp.route('/orders/customer/<int:customer_id>', methods=['GET'])
def get_orders_by_customer_id(customer_id):
    try:
        orders = db.session.query(Order, Product).join(Product, Order.product_id == Product.id).filter(Order.customer_id == customer_id).all()
        result = []
        for order, product in orders:
            order_dict = order.to_dict()
            order_dict['product_name'] = product.name
            order_dict['product_description'] = product.description
            order_dict['product_price'] = product.price
            result.append(order_dict)
        return jsonify(result), 200
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

@order_bp.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()
    new_order = Order(customer_id=data['customer_id'], product_id=data['product_id'], quantity=data['quantity'])
    try:
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.to_dict()), 201
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@order_bp.route('/orders/<int:id>', methods=['PUT'])
def update_order(id):
    data = request.get_json()
    order = Order.query.get_or_404(id)
    for key, value in data.items():
        setattr(order, key, value)
    try:
        db.session.commit()
        return jsonify(order.to_dict()), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@order_bp.route('/orders/<int:id>', methods=['DELETE'])
def delete_order(id):
    order = Order.query.get_or_404(id)
    try:
        db.session.delete(order)
        db.session.commit()
        return jsonify({'message': 'Order deleted successfully'}), 200
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500