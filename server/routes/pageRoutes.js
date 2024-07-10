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
  const { userId } = req.query;

  try {
    const [savedJobs] = await db.query(
      `SELECT job_id FROM saved_jobs WHERE user_id = ?;`,
      [userId]
    );
    const savedJobIds = savedJobs.map((job) => job.job_id);
    res.status(200).json(savedJobIds);
  } catch (err) {
    console.error("Error fetching saved job offers:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching saved job offers" });
  }
});

router.delete("/save-job-offer", async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    await db.query(`DELETE FROM saved_jobs WHERE user_id = ? AND job_id = ?;`, [
      userId,
      jobId,
    ]);
    res.status(200).json("Saved job offer removed successfully");
  } catch (err) {
    console.error("Error deleting saved job offer:", err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting saved job offer" });
  }
});

router.get("/user-saved-jobs", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [userSavedJobs] = await db.query(
      `SELECT saved_jobs.*, 
              job_offers.title AS title, 
              job_offers.company_id AS company_id,
              companies.name AS company_name
       FROM saved_jobs 
       INNER JOIN job_offers ON job_offers.job_id = saved_jobs.job_id 
       INNER JOIN companies ON companies.company_id = job_offers.company_id 
       WHERE saved_jobs.user_id = ?`,
      [userId]
    );

    if (userSavedJobs.length === 0) {
      return res
        .status(204)
        .json({ message: "No saved jobs found for this user." });
    }

    res.status(200).json(userSavedJobs);
  } catch (err) {
    console.error("Error fetching saved job offers for user:", err);
    res.status(500).json({
      error: "An error occurred while fetching saved job offers for user",
    });
  }
});

router.get("/user-job-applications", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [userApplications] = await db.query(
      `SELECT job_applications.*,
      job_offers.title as title,
      companies.name as company_name
      FROM job_applications
      INNER JOIN job_offers ON job_offers.job_id = job_applications.job_id
      INNER JOIN companies ON companies.company_id = job_offers.company_id
      WHERE job_applications.user_id = ?`,
      [userId]
    );

    if (userApplications.length === 0) {
      return res
        .status(204)
        .json({ message: "No job applications found for this user." });
    }

    res.status(200).json(userApplications);
  } catch (err) {
    console.error(
      "An error occurred while fetching user job applications:",
      err
    );
    res.status(500).json({
      error: "An error occurred while fetching user job applications",
    });
  }
});

router.get("/verification-request", authenticateToken, async (req, res) => {
  try {
    const [verificationReqJobOffers] = await db.query(
      "SELECT job_offers.*, companies.name as company_name FROM job_offers INNER JOIN companies ON companies.company_id = job_offers.company_id;"
    );

    const [verificationReqCompanies] = await db.query(
      "SELECT * FROM companies WHERE verified = 0;"
    );

    if (
      verificationReqJobOffers.length === 0 &&
      verificationReqCompanies.length === 0
    ) {
      return res
        .status(204)
        .json({ message: "No verification awaiting requests available." });
    }

    const totalVerificationReq = [
      ...verificationReqJobOffers,
      ...verificationReqCompanies,
    ];

    res.status(200).json(totalVerificationReq);
  } catch (err) {
    console.error(
      "An error occurred while fetching verification awaiting requests:",
      err
    );
    res.status(500).json({
      error: "An error occurred while fetching verification awaiting requests",
    });
  }
});

export default router;
