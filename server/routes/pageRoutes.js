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
    const row = await db.query("SELECT * FROM companies WHERE name = ?", [
      companyName,
    ]);
    res.json(row);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "An error occurred while fetching company" });
  }
});

export default router;
