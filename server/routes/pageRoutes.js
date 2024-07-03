import express from "express";
import db from "../config/dbConfig.js";
import authenticateToken from "../middleware/authMiddleware.js";
import getUserProfile from "../controllers/userController.js";

const router = express.Router();

router.get("/company-overview", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT name, banner, logo, num_employees, count_offers FROM companies"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching companies" });
  }
});

router.get("/company/:companyName", async (req, res) => {
  const companyName = req.params.companyName;

  try {
    const rows = await db.query("SELECT * FROM companies WHERE name = ?", [
      companyName,
    ]);

    const companies = await db.query(
      "SELECT name, headquarters, logo FROM companies"
    );

    if (rows.length > 0) {
      const company = rows[0];
      res.json({ company, companies });
    } else {
      res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    console.error("Error fetching company:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the company" });
  }
});

router.get("/profile", authenticateToken, getUserProfile);

router.get("/blogs", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT b.*, u.fullName
      FROM blogs b
      JOIN users u ON b.user_id = u.user_id
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ err: "An error occurred while fetching blogs" });
  }
});

router.get("/blog/:blogId", async (req, res) => {
  const blogId = req.params.blogId;

  try {
    const [row] = await db.query("SELECT * FROM blogs WHERE blog_id = ?", [
      blogId,
    ]);

    if (row.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(row[0]);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the blog" });
  }
});

router.get("/job-listings", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT job_offers.*, companies.logo AS company_logo
      FROM job_offers
      INNER JOIN companies ON job_offers.company_id = companies.company_id
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching job listings:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching job listings" });
  }
});

router.post("/save-job-offer", async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    await db.query(`INSERT INTO saved_jobs (user_id, job_id) VALUES (?, ?);`, [
      userId,
      jobId,
    ]);
    res.status(200).json("Job saved successfully");
  } catch (err) {
    console.error("Error saving job offer:", err);
    res.status(500).json({ error: "An error occurred while saving job offer" });
  }
});

router.get("/save-job-offer", async (req, res) => {
  const { userId } = req.body;

  try {
    await db.query(
      `SELECT jo.* FROM job_offers jo
    JOIN saved_jobs sj ON jo.job_id = sj.job_id
    WHERE sj.user_id = ?;`,
      [userId]
    );
    res.status(200).json("Saved jobs fetched successfully");
  } catch (err) {
    console.error("Error fetching saved job offers:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching saved job offers" });
  }
});

router.get("save-job-offe");

export default router;
