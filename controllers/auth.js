import User from "../models/user.js";
import jwt from "jsonwebtoken";

export async function userSignUp(req, res) {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "123456789h",
    });
    return res
      .status(201)
      .json({ message: "User created successfully", token: token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export async function userLogIn(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "123456789h",
    });
    return res.json({ msg: "logged in", token: token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
