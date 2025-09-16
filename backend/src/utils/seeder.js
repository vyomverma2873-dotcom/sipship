const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// Load environment variables
dotenv.config({ path: '../.env' });

// Sample products data
const products = [
  {
    name: 'Château Margaux 2015',
    description: 'A premier Bordeaux wine with rich flavors of dark berries, tobacco, and oak. Elegant tannins with a long finish.',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1586370434639-0fe43b9e017b?q=80&w=1000',
    category: 'wine',
    countInStock: 15,
    rating: 4.9,
    numReviews: 12,
    featured: true,
    alcoholContent: 13.5,
    origin: 'France',
    volume: 750,
  },
  {
    name: 'Macallan 18 Year Single Malt',
    description: 'Matured in a combination of sherry and bourbon casks for 18 years. Notes of dried fruits, spice, and oak.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1000',
    category: 'spirits',
    countInStock: 8,
    rating: 4.8,
    numReviews: 10,
    featured: true,
    alcoholContent: 43,
    origin: 'Scotland',
    volume: 750,
  },
  {
    name: 'Veuve Clicquot Brut Champagne',
    description: 'Classic champagne with perfect balance of power and finesse. Notes of apple, citrus, and brioche.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1592185285645-5b9d0f0e636d?q=80&w=1000',
    category: 'wine',
    countInStock: 25,
    rating: 4.7,
    numReviews: 18,
    featured: true,
    alcoholContent: 12,
    origin: 'France',
    volume: 750,
  },
  {
    name: 'Don Julio 1942 Añejo Tequila',
    description: 'Ultra-premium tequila aged for a minimum of two and a half years. Warm oak, vanilla, and roasted agave flavors.',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1514218698632-ef079aaafdb9?q=80&w=1000',
    category: 'spirits',
    countInStock: 12,
    rating: 4.9,
    numReviews: 15,
    featured: true,
    alcoholContent: 40,
    origin: 'Mexico',
    volume: 750,
  },
  {
    name: 'Trappistes Rochefort 10',
    description: 'One of the world\'s most sought-after Trappist beers. Rich, complex flavors of dark fruit, chocolate, and spice.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?q=80&w=1000',
    category: 'beer',
    countInStock: 30,
    rating: 4.6,
    numReviews: 22,
    featured: false,
    alcoholContent: 11.3,
    origin: 'Belgium',
    volume: 330,
  },
  {
    name: 'Seedlip Garden 108 Non-Alcoholic Spirit',
    description: 'A floral blend of hand-picked peas and homegrown hay with traditional garden herb distillates. Perfect for non-alcoholic cocktails.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1000',
    category: 'non-alcoholic',
    countInStock: 20,
    rating: 4.3,
    numReviews: 8,
    featured: true,
    alcoholContent: 0,
    origin: 'United Kingdom',
    volume: 700,
  },
  {
    name: 'Opus One 2018',
    description: 'Prestigious Napa Valley red blend with aromas of black cherry, cassis, and dark chocolate. Silky tannins with a long finish.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1000',
    category: 'wine',
    countInStock: 6,
    rating: 4.9,
    numReviews: 9,
    featured: true,
    alcoholContent: 14.5,
    origin: 'United States',
    volume: 750,
  },
  {
    name: 'Yamazaki 12 Year Japanese Whisky',
    description: 'Japan\'s most highly awarded single malt whisky. Hints of peach, pineapple, grapefruit, clove, and candied orange.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1000',
    category: 'spirits',
    countInStock: 10,
    rating: 4.8,
    numReviews: 14,
    featured: false,
    alcoholContent: 43,
    origin: 'Japan',
    volume: 750,
  },
  {
    name: 'Westvleteren 12',
    description: 'Often considered the best beer in the world. Complex flavors of dark fruit, caramel, and chocolate with a smooth finish.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=1000',
    category: 'beer',
    countInStock: 15,
    rating: 5.0,
    numReviews: 25,
    featured: true,
    alcoholContent: 10.2,
    origin: 'Belgium',
    volume: 330,
  },
  {
    name: 'Ritual Zero Proof Tequila Alternative',
    description: 'All the taste of tequila, none of the alcohol. Notes of blue agave, Mexican lime, and tropical guava.',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?q=80&w=1000',
    category: 'non-alcoholic',
    countInStock: 18,
    rating: 4.2,
    numReviews: 7,
    featured: false,
    alcoholContent: 0,
    origin: 'United States',
    volume: 750,
  },
  {
    name: 'Dom Pérignon Vintage 2012',
    description: 'Prestigious champagne with notes of almond, powdered cocoa, white fruit, and dried flowers. Silky texture with a long finish.',
    price: 219.99,
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1000',
    category: 'wine',
    countInStock: 8,
    rating: 4.9,
    numReviews: 11,
    featured: true,
    alcoholContent: 12.5,
    origin: 'France',
    volume: 750,
  },
  {
    name: 'Hennessy X.O Cognac',
    description: 'Rich, robust cognac with notes of candied fruit, dark chocolate, and oak. Smooth, long-lasting finish.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1569529568689-58a1d2df611c?q=80&w=1000',
    category: 'spirits',
    countInStock: 10,
    rating: 4.7,
    numReviews: 13,
    featured: false,
    alcoholContent: 40,
    origin: 'France',
    volume: 750,
  },
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  isAdmin: true,
  isVerified: true,
};

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sipandship')
  .then(async () => {
    console.log('Connected to MongoDB');

    try {
      // Clear existing data
      await Product.deleteMany();
      await User.deleteMany();

      console.log('Data cleared');

      // Create admin user
      const createdAdmin = await User.create(adminUser);
      console.log('Admin user created');

      // Add admin user ID to products and create them
      const sampleProducts = products.map((product) => {
        return { ...product, user: createdAdmin._id };
      });

      await Product.insertMany(sampleProducts);
      console.log('Products data imported');

      console.log('Data import completed successfully');
      process.exit();
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  });