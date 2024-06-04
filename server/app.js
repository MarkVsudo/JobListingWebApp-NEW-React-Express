const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const DOMAIN = process.env.DOMAIN;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Start your Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} | ${DOMAIN} |`);
});
