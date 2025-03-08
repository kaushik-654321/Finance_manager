const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
const allowedOrigins = [
  "https://finance-manager-xi-two.vercel.app", // Your frontend URL
]
// Allow requests from your frontend origin
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies if needed
  })
);

// // OR (Allow all origins, useful for development only)
app.use(cors());

// ✅ Explicitly handle preflight (`OPTIONS`) requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins[0]);
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(204); // No content
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);
app.use("/api/user", authRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
