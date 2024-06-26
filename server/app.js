import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import formRoutes from "./routes/formRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Middleware serving routes
app.use("/api", formRoutes);
app.use("/api", pageRoutes);
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at | ${DOMAIN} |`);
});
