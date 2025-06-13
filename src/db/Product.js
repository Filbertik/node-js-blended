const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ['books', 'electronics', 'clothing', 'other'],
      required: true,
      default: 'other',
    },
    description: { type: String },
  },
  { timestamps: true },
);

const Product = model('Product', productSchema);

module.exports = Product;
