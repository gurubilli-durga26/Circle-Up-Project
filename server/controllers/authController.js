import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const publicUser = (user) => ({
  _id: user._id,
  id: user._id,
  name: user.name,
  email: user.email,
  location: user.location,
  bio: user.bio || "",
  hobbies: user.hobbies || [],
  role: user.role,
  achievements: user.achievements || [],
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function register(req, res) {
  const {
    name,
    email,
    password,
    location,
    bio = "",
    hobbies = [],
  } = req.body;

  const cleanName = String(name || "").trim();
  const cleanEmail = normalizeEmail(email);
  const cleanLocation = String(location || "").trim();

  if (!cleanName || !cleanEmail || !password || !cleanLocation) {
    return res.status(400).json({
      success: false,
      message: "Name, email, password and location are required",
    });
  }

  if (cleanName.length < 2 || cleanName.length > 80) {
    return res.status(400).json({
      success: false,
      message: "Name must be between 2 and 80 characters",
    });
  }

  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address",
    });
  }

  if (typeof password !== "string" || password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  if (!Array.isArray(hobbies) || hobbies.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Choose at least one hobby",
    });
  }

  const existingUser = await User.findOne({ email: cleanEmail });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email is already registered",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name: cleanName,
    email: cleanEmail,
    password: hashedPassword,
    location: cleanLocation,
    bio: String(bio || "").trim(),
    hobbies,
  });

  return res.status(201).json({
    success: true,
    message: "Registration successful",
    token: generateToken(user),
    user: publicUser(user),
  });
}

export async function login(req, res) {
  const email = normalizeEmail(req.body.email);
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  return res.json({
    success: true,
    message: "Login successful",
    token: generateToken(user),
    user: publicUser(user),
  });
}

export async function me(req, res) {
  return res.json({
    success: true,
    user: publicUser(req.user),
  });
}
