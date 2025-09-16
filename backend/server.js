const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

// ✅ MongoDB Connect
connectDB();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ CORS Setup – allow any localhost:* (5173, 5174, 5175 etc.)
app.use(
  cors({
    origin: [/http:\/\/localhost:\d+$/], // regex: allow all localhost ports
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// ✅ Port (hardcode 5001 for backend)
const PORT = 5001;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
