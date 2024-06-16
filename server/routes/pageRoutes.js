import express from "express";
import db from "../config/dbConfig.js";

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

    if (rows.length > 0) {
      const company = rows[0]; // Get the first (and likely only) result
      res.json({ company });
    } else {
      res.status(404).json({ error: "Company not found" });
    }
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "An error occurred while fetching company" });
  }
});

export default router;
