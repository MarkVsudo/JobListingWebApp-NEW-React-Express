const express = require("express");
const app = express();
const path = require("path");

// Middleware to remove .html extension
app.use((req, res, next) => {
  if (req.path !== "/" && req.path.endsWith(".html")) {
    const newPath = req.path.slice(0, -5);
    res.redirect(301, newPath);
  } else {
    next();
  }
});

// Serve static files from the "public" directory
app.use(
  express.static(path.join(__dirname, "..", "public"), { extensions: ["html"] })
);

// Route handler for 404 errors
app.get("*", (req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "..", "public", "404-page.html"));
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
