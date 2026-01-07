const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  console.error("CRITICAL: JWT_SECRET is missing from .env file!");
}

const tripRoutes = require("./routes/tripRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// 1. Logging Middleware (MUST BE AT TOP)
app.use((req, res, next) => {
  console.log(`>>> ${req.method} ${req.url}`);
  next();
});

// 2. Base Middleware
app.use(cors());
app.use(express.json());

// 3. Routes
app.use("/api/trips", tripRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is healthy" });
});

// Root check
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀 (Port 5005)");
});

// 4. MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

// 5. Global Error Handler
app.use((err, req, res, next) => {
  console.error("!!! SERVER ERROR:", err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});

// 6. Start Server
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test simple link: http://localhost:${PORT}/api/health`);
});
