import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authController = {
  async register(req, res) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      
      // Log the received data
      console.log('Received registration data:', req.body);

      if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });

      res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
      console.error("Registration Error:", error);  // Log detailed error
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
};

export default authController;
