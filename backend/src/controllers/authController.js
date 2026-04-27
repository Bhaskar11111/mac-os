import mongoose from "mongoose";
import User from "../models/User.js";
import { signJwt } from "../utils/jwt.js";
import dotenv from 'dotenv'
dotenv.config()

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const ensureDatabase = (res) => {
  if (mongoose.connection.readyState === 1) return true;

  res.status(503).json({
    success: false,
    message: "Database is not connected"
  });
  return false;
};

const createSessionResponse = (res, user) => {
  const token = signJwt(
    { userId: user._id.toString(), email: user.email, name: user.name },
    process.env.JWT_SECRET
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res.json({
    success: true,
    data: {
      token,
      user: user.toSafeJSON()
    }
  });
};

export const register = async (req, res) => {
  try {
    if (!ensureDatabase(res)) return;

    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password || "";

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email must be valid"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered"
      });
    }

    const user = new User({ name, email });
    user.setPassword(password);
    await user.save();

    createSessionResponse(res, user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to register"
    });
  }
};

export const login = async (req, res) => {
  try {
    if (!ensureDatabase(res)) return;

    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password || "";

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });
    if (!user || !user.validatePassword(password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    createSessionResponse(res, user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to login"
    });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
};

export const me = async (req, res) => {
  try {
    if (!ensureDatabase(res)) return;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      data: {
        user: user.toSafeJSON()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Unable to fetch user"
    });
  }
};
