const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("../config/db");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

// ✅ Load env
dotenv.config();

// ✅ Connect DB (centralized)
connectDB();

// Sample Users
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
];

// Sample Products
const products = [
  {
    name: "Premium Red Wine",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3",
    description:
      "A full-bodied red wine with notes of blackberry, plum, and a hint of oak. Perfect for pairing with red meat dishes.",
    brand: "Vineyard Estates",
    category: "Wine",
    price: 29.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    volume: "750ml",
    alcoholContent: 14.5,
    origin: "France",
    featured: true,
  },
  {
    name: "Craft IPA Beer",
    image:
      "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3",
    description:
      "A hoppy India Pale Ale with citrus and pine notes. Brewed locally with premium ingredients.",
    brand: "Hoppy Brewery",
    category: "Beer",
    price: 9.99,
    countInStock: 20,
    rating: 4.0,
    numReviews: 8,
    volume: "330ml",
    alcoholContent: 6.2,
    origin: "USA",
    featured: true,
  },
  {
    name: "Single Malt Whiskey",
    image:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?ixlib=rb-4.0.3",
    description:
      "Aged 12 years in oak barrels, this smooth whiskey has notes of caramel, vanilla, and a subtle smokiness.",
    brand: "Highland Distillery",
    category: "Spirits",
    price: 59.99,
    countInStock: 5,
    rating: 5,
    numReviews: 15,
    volume: "700ml",
    alcoholContent: 40,
    origin: "Scotland",
    featured: true,
  },
  {
    name: "Sparkling Water",
    image:
      "https://images.unsplash.com/photo-1598990386084-8af4dd12b3c4?ixlib=rb-4.0.3",
    description:
      "Refreshing sparkling water with natural lemon flavor. Zero calories and no artificial sweeteners.",
    brand: "Pure Springs",
    category: "Non-Alcoholic",
    price: 3.99,
    countInStock: 50,
    rating: 4.2,
    numReviews: 10,
    volume: "500ml",
    alcoholContent: 0,
    origin: "Italy",
    featured: false,
  },
];

// Import Data
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("✅ Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete Data
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("🗑 Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// CLI args
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
