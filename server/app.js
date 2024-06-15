import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import formRoutes from "./routes/formRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Use the routes defined in routes.js
app.use("/api", formRoutes);
app.use("/api", pageRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at | ${DOMAIN} |`);
});
