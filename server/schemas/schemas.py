from marshmallow import Schema, fields, validate

# Customer Schema for Validation
class CustomerSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=[validate.Length(min=1, max=100)])
    email = fields.Email(required=True)
    phone = fields.Str(required=True, validate=[validate.Length(min=10, max=20)])

# Product Schema for Validation
class ProductSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=[validate.Length(min=1, max=100)])
    description = fields.Str(validate=[validate.Length(max=255)])
    price = fields.Float(required=True)

# Order Schema for Validation
class OrderSchema(Schema):
    id = fields.Int(dump_only=True)
    customer_id = fields.Int(required=True)
    product_id = fields.Int(required=True)
    quantity = fields.Int(required=True)
    order_date = fields.DateTime(dump_only=True)