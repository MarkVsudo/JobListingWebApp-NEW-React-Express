import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ msg: "Token is not valid" });
    req.user = user.user; // Correctly set the user in the request
    next();
  });
};

export default authenticateToken;
