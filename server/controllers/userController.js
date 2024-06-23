import db from "../config/dbConfig.js";

const getUserProfile = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT user_id, fullName, email, role FROM users WHERE user_id = ?",
      [req.user.id] // Correctly use the ID from the token payload
    );
    if (users.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    const user = users[0];
    res.json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export default getUserProfile;
