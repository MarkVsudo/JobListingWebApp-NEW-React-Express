import express from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import db from "../config/dbConfig.js";

const router = express.Router();

// Regular expression for password validation
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
// Route for register
router.post(
  "/register",
  [
    check("email", "Please include a valid email").isEmail(),
    check("username", "Full name is required").not().isEmpty(),
    check("password")
      .matches(passwordRegex)
      .withMessage(
        "Password must be 8-20 characters long, contain at least one letter or number"
      ),
  ],
  async (req, res) => {
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
  }
);

export default router;
