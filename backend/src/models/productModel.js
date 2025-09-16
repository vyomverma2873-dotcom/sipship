const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: 0,
    },
    image: {
      type: String,
      required: [true, 'Please provide product image'],
    },
    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['wine', 'spirits', 'beer', 'non-alcoholic'],
    },
    countInStock: {
      type: Number,
      required: [true, 'Please provide count in stock'],
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    featured: {
      type: Boolean,
      default: false,
    },
    alcoholContent: {
      type: Number,
      min: 0,
      max: 100,
    },
    origin: {
      type: String,
    },
    volume: {
      type: Number, // in ml
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;