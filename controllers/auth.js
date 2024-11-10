import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Function to handle user sign-up
export async function userSignUp(req, res) {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    // Save new user to the database
    await newUser.save();

    // Generate JWT token with the user's unique ID as the payload
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "123456789h", // Set a long expiration time for the token
    });

    // Send a success response with the generated token
    return res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (err) {
    // Handle errors (e.g., database errors) and send a 500 status code
    return res.status(500).json({ error: err.message });
  }
}

// Function to handle user login
export async function userLogIn(req, res) {
  try {
    const { email, password } = req.body;

    // Check if a user with the given email exists in the database
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    // Verify the provided password against the stored hash
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token with the user's unique ID as the payload
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "123456789h", // Set a long expiration time for the token
    });

    // Send a success response with the generated token
    return res.json({ msg: "logged in", token: token });
  } catch (err) {
    // Handle errors and send a 500 status code
    return res.status(500).json({ error: err.message });
  }
}
