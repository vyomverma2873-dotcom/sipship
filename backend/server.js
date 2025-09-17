const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Create Express app
const app = express();

// ✅ CORS Setup – allow local + deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",       // local frontend (vite default)
      "https://sipship.onrender.com" // deployed frontend
    ],
    credentials: false, // ❌ no cookies needed, JWT is in localStorage
  })
);

// Middleware
app.use(express.json());

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sipandship';

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(`✅ Connected to MongoDB: ${mongoURI}`);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
