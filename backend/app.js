const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());

const allowedOrigins = [
  "https://finance-manager-xi-two.vercel.app"
];

// Allow requests from your frontend origin
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies if needed
  })
);

// ✅ Explicitly handle preflight (`OPTIONS`) requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(204); // No content
});

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/user", authRoutes);

module.exports = app; // ✅ Export the app (NOT app.listen)
