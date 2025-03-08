const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ fullName, email, phone, password });
    if (user) {
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ token: generateToken(user._id), userId: user._id, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
