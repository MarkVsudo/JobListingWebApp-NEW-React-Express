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

const getUserFile = async (req, res) => {
  try {
    const [result] = await db.query(
      "SELECT * FROM user_files WHERE user_id = ?",
      [req.user.id]
    );
    const files = result.length ? result : null;
    res.json({ files });
  } catch (err) {
    console.error("An error occurred while fetching user files:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const postUserFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "File upload failed" });
  }

  try {
    const fileUrl = req.file.location;
    const fileMimeType = req.file.mimetype;
    const fileSize = (req.file.size / 1000000).toFixed(2);
    const fileName = decodeURIComponent(req.file.originalname);

    await db.query(
      "INSERT INTO user_files (user_id, file_url, file_type, file_size, file_name) VALUES (?, ?, ?, ?, ?)",
      [req.user.id, fileUrl, fileMimeType, fileSize, fileName]
    );
    res.status(200).json({ msg: "File uploaded successfully" });
  } catch (err) {
    console.error("An error occurred while uploading user file:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

const jobApplication = async (req, res) => {
  const { jobId, phoneNumber, linkedInURL, selectedFiles, motivationalLetter } =
    req.body;
  const userId = req.user.id;

  try {
    await db.query(
      "INSERT INTO job_applications (job_id, user_id, motivational_letter, selected_files, phone_number, linkedin_url ) VALUES (?, ?, ?, ?, ?, ?)",
      [
        jobId,
        userId,
        motivationalLetter,
        selectedFiles,
        phoneNumber,
        linkedInURL,
      ]
    );
    res.status(201).json({ msg: "Job application submitted successfully" });
  } catch (err) {
    console.error("An error occurred while submitting job application:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export {
  getUserProfile,
  getUserAvatar,
  updateUserAvatar,
  getUserFile,
  postUserFile,
  jobApplication,
};
