// src/routes/authRoutes.js
import express from "express";
import { check } from "express-validator";
import dotenv from "dotenv";
import { loginUser, registerUser } from "../controllers/authController.js";

dotenv.config();

const router = express.Router();

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

// Route for register
router.post(
  "/register",
  [
    check("password")
      .matches(passwordRegex)
      .withMessage(
        "Password must be 8-20 characters long and contain at least one letter and one number"
      ),
    check("email", "Please include a valid email").isEmail(),
    check("username", "Full name is required").not().isEmpty(),
  ],
  registerUser
);

// Route for login
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  loginUser
);

export default router;
