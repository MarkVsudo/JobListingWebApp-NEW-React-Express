import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/dbConfig.js";
import transporter from "../config/nodemailerConfig.js";

// Login User Function
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

// Register User Function
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
      return res
        .status(400)
        .json({ msg: "User with the same e-mail already exists." });
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

// Reset User Password Function
export const resetUserPasswordEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ resetErrors: errors.array() });
  }

  const { resetEmail } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      resetEmail,
    ]);
    if (users.length === 0) {
      return res.status(400).json({ msg: "User not found" });
    }

    const payload = { email: resetEmail };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "15s",
    });

    const resetURL = `http://localhost:5173/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: resetEmail,
      subject: "Password reset link (valid 15 seconds)",
      html: `Use this <a href="${resetURL}">link</a> to reset your password.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully.");
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Endpoint to handle actual password reset
export const confirmPasswordReset = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ resetErrors: errors.array() });
  }

  const { token, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query("UPDATE users SET password = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);

    res.status(200).json({ msg: "Password reset successfully" });
  } catch (err) {
    console.error("Error confirming password reset:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, userId } = req.body;

  try {
    const [users] = await db.query(
      "SELECT user_id FROM users WHERE email = ?",
      [email]
    );

    if (users.length && users[0].user_id !== userId) {
      return res.status(400).json({ msg: "This email is already in use." });
    }

    await db.query(
      "UPDATE users SET fullName = ?, email = ? WHERE user_id = ?",
      [fullName, email, userId]
    );

    res.status(200).json({ msg: "User profile updated successfully" });
  } catch (err) {
    console.error("Error updating user data:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
