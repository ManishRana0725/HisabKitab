const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/auth");
const User = require("../models/UserModel");

const UserController = {
  // Register a new user and return token
  registerUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      // Create user
      const newUser = new User({ name , email , password: hashedPassword });
      await newUser.save();

      // Generate token
      const token = generateToken(newUser._id);

      res.status(201).json({ message: "User registered successfully", token, user: newUser });
    } catch (error) {
      console.error("Signup Error:", error); // Log the actual error
      res.status(500).json({ message: "Error registering user", error:error.message });
    }
  },

  // User Login (Authenticate & return token)
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate token
      const token = generateToken(user._id.toString());
      // ✅ Add CORS headers in response
      res.header("Access-Control-Allow-Origin", "http://localhost:5173");
      res.header("Access-Control-Allow-Credentials", "true");

      res.json({ message: "Login successful", token, user });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  },

  // Get User Details
  getUserDetails: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user", error });
    }
  },

  // Update User Details
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!updatedUser) return res.status(404).json({ message: "User not found" });

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  },
};

module.exports = UserController;
