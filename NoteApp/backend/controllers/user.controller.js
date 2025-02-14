const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Import bcrypt
const User = require("../models/user.model");

// To register a user
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: true, message: "Email already exists" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

    res.json({ error: false, user, accessToken: token, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// To log in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: "Invalid credentials" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: true, message: "Invalid credentials" });
    }

    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });

    res.json({ error: false, message: "Login successful", accessToken: token });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// To get details of a user
const getUser = async (req, res) => {
  const { user } = req.user;
  const userInfo = await User.findById(user._id);

  if (!userInfo) {
    return res.sendStatus(401);
  }

  res.json({
    user: {
      fullName: userInfo.fullName,
      email: userInfo.email,
      _id: userInfo._id,
      createdOn: userInfo.createdOn,
    },
  });
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  const { user } = req.user;
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({ error: true, message: "Full Name and Email are required" });
  }

  try {
    const existingUser = await User.findOne({ _id: user._id });
    if (!existingUser) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    existingUser.fullName = fullName;
    existingUser.email = email;
    await existingUser.save();

    return res.json({
      error: false,
      user: {
        fullName: existingUser.fullName,
        email: existingUser.email,
        _id: existingUser._id,
      },
      message: "Profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

module.exports = { registerUser, loginUser, getUser, updateUserProfile };
