
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const pizzaRoutes = require("./routes/pizzaRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());
app.use("/api/pizzas", pizzaRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SliceSync API!",
    status: "running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SliceSync backend is working!",
    database: mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected"
  });
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(
        `SliceSync server running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
