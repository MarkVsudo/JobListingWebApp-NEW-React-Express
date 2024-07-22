import db from "../config/dbConfig.js";

const getUserProfile = async (req, res) => {
  try {
    const [users] = await db.query(
      "SELECT user_id, fullName, email, role FROM users WHERE user_id = ?",
      [req.user.id]
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

const getUserAvatar = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT avatar FROM users WHERE user_id = ?",
      [req.user.id]
    );
    const avatar = result.length ? result[0].avatar : null;
    res.json({ avatar });
  } catch (err) {
    console.error("An error occurred while fetching user avatar:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateUserAvatar = async (req, res) => {
  if (!req.file || !req.file.location) {
    return res.status(400).json({ msg: "Image upload failed" });
  }

  const avatarUrl = req.file.location;

  try {
    await db.query("UPDATE users SET avatar = ? WHERE user_id = ?", [
      avatarUrl,
      req.user.id,
    ]);
    res.status(200).json({ msg: "Avatar updated successfully" });
  } catch (err) {
    console.error("An error occurred while updating user avatar:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export { getUserProfile, getUserAvatar, updateUserAvatar };
