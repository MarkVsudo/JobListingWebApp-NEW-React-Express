// src/controllers/authController.js
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/dbConfig.js";

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, jwtExpiration } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.user_id,
        role: user.role,
      },
    };

    const expiresInValue = jwtExpiration || process.env.JWT_EXPIRES;

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: expiresInValue },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Error logging in user:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    username,
    password,
    email,
    role = "applicant",
    subscribed = 0,
  } = req.body;

  try {
    const [existingUsers] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUsers.length > 0) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      fullName: username,
      email,
      password: hashedPassword,
      role,
      subscribed,
    };

    await db.query("INSERT INTO users SET ?", newUser);

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
