const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isRecurring: { type: Boolean, default: false },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
