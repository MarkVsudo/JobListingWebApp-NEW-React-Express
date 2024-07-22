import express from "express";
import db from "../config/dbConfig.js";
import authenticateToken from "../middleware/authMiddleware.js";
import {
  getUserProfile,
  getUserAvatar,
} from "../controllers/userController.js";

import transporter from "../config/nodemailerConfig.js";

const router = express.Router();

router.get("/company-overview", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT name, banner, logo, num_employees, count_offers FROM companies WHERE verified = 1;"
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
    const rows = await db.query(
      "SELECT * FROM companies WHERE name = ? AND verified = 1",
      [companyName]
    );

    const companies = await db.query(
      "SELECT name, company_address, logo FROM companies"
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

router.get("/user-avatar", authenticateToken, getUserAvatar);

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
    const { location, jobType, industry, experience, salary, companySize } =
      req.query;
    console.log("Query Parameters:", req.query);

    const locationQuery = location ? `AND job_offers.location IN (?)` : "";
    const jobTypeQuery = jobType ? `AND job_offers.employment_type IN (?)` : "";
    const industryQuery = industry ? `AND companies.industry IN (?)` : "";
    const experienceQuery = experience
      ? `AND job_offers.experience IN (?)`
      : "";
    const salaryQuery = salary ? `AND job_offers.salary IN (?)` : "";
    const companySizeQuery = companySize ? `AND companies.size IN (?)` : "";

    let filterQuery = "";
    if (location) filterQuery += locationQuery;
    if (jobType) filterQuery += jobTypeQuery;
    if (industry) filterQuery += industryQuery;
    if (experience) filterQuery += experienceQuery;
    if (salary) filterQuery += salaryQuery;
    if (companySize) filterQuery += companySizeQuery;

    const query = `
      SELECT job_offers.*, companies.logo AS company_logo, companies.size AS company_size, companies.industry AS company_industry
      FROM job_offers
      INNER JOIN companies ON job_offers.company_id = companies.company_id
      WHERE job_offers.verified = 1 ${filterQuery};`;

    const queryParams = [];
    if (location) queryParams.push(location.split(","));
    if (jobType) queryParams.push(jobType.split(","));
    if (industry) queryParams.push(industry.split(","));
    if (experience) queryParams.push(experience.split(","));
    if (salary) queryParams.push(salary.split(","));
    if (companySize) queryParams.push(companySize.split(","));

    let [rows] = await db.query(query, queryParams);

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

router.get("/recruiter-verification", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      "SELECT verified FROM companies WHERE user_id = ?",
      [userId]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error(
      "An error occurred while checking user verification status:",
      err
    );
    res.status(500).json({
      error: "An error occurred while checking user verification status",
    });
  }
});

router.get("/verification-request", authenticateToken, async (req, res) => {
  try {
    const [verificationReqJobOffers] = await db.query(
      `SELECT job_offers.*, companies.name as company_name
      FROM job_offers
      INNER JOIN companies ON companies.company_id = job_offers.company_id
      WHERE job_offers.verified = 0;
      `
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

// Approve Request
router.patch("/approve-request", authenticateToken, async (req, res) => {
  let { type, jobId, companyId, userEmail } = req.body;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: userEmail,
    subject: `JobConqueror | ${type} request approved`,
    text: `Your request for a ${type} verification has been approved. Check it out on the ${type} page.`,
  };

  if (type === "Job Offer") {
    type = "job_offers";
  } else if (type === "Company") {
    type = "companies";
  } else {
    return res.status(400).json({ error: "Invalid request type" });
  }

  try {
    if (type === "job_offers") {
      await db.query(`UPDATE job_offers SET verified = 1 WHERE job_id = ?`, [
        jobId,
      ]);
    } else if (type === "companies") {
      await db.query(`UPDATE companies SET verified = 1 WHERE company_id = ?`, [
        companyId,
      ]);
    }
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Request approved successfully" });
  } catch (err) {
    console.error("An error occurred while approving request", err);
    res
      .status(500)
      .json({ error: "An error occurred while approving request" });
  }
});

// Reject Request
router.delete("/reject-request", authenticateToken, async (req, res) => {
  let { type, jobId, companyId, userEmail } = req.body;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: userEmail,
    subject: `JobConqueror | ${type} request rejected`,
    text: `Your request for a ${type} verification has been rejected. Please try submitting a new request again.`,
  };

  if (type === "Job Offer") {
    type = "job_offers";
  } else if (type === "Company") {
    type = "companies";
  } else {
    return res.status(400).json({ error: "Invalid request type" });
  }

  try {
    if (type === "job_offers") {
      await db.query(`DELETE FROM job_offers WHERE job_id = ?`, [jobId]);
    } else if (type === "companies") {
      await db.query(`DELETE FROM companies WHERE company_id = ?`, [companyId]);
    }
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Request rejected successfully" });
  } catch (err) {
    console.error("An error occurred while rejecting request", err);
    res
      .status(500)
      .json({ error: "An error occurred while rejecting request" });
  }
});

export default router;
