const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRouter");
const userRoutes = require("./src/routes/userRouter");
const addressRoutes = require("./src/routes/addressRouter");
const productsRoutes = require("./src/routes/productRouter");
const orderRoutes = require("./src/routes/orderRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/products", productsRoutes);
// app.use("/api/orders");

app.use("/api/health", (req, res) => {
  res.send("health ok.");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
