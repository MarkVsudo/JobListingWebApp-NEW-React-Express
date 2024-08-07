import express from "express";
import multer from "multer";
import transporter from "../config/nodemailerConfig.js";
import db from "../config/dbConfig.js";

const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route for emailing resume
router.post("/emailResume", upload.single("resume"), async (req, res) => {
  const { email } = req.body;
  const resume = req.file;

  if (!email || !resume) {
    return res.status(400).send("Email and resume are required.");
  }

  try {
    const mailOptions = {
      from: email,
      to: process.env.MAIL_USER,
      subject: "New Vocation Inquiry Received",
      text: "A new inquiry has been submitted through the vocation form.",
      attachments: [
        {
          filename: resume.originalname,
          content: resume.buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

// Route for subscribing to newsletter
router.post("/newsletter", async (req, res) => {
  const { newsletterEmail } = req.body;

  if (!newsletterEmail) {
    return res
      .status(400)
      .send("Email is required for subscribing to newsletter");
  }

  try {
    await db.query(`INSERT IGNORE INTO newsletter (email) VALUES (?) `, [
      newsletterEmail,
    ]);
    res.status(200).json("Subscribing to newsletter successfully");
  } catch (err) {
    console.error("Error subscribing to newsletter:", err);
    res
      .status(500)
      .json({ error: "An error occurred while subscribing to newsletter" });
  }
});

// Route for submitting recruiter verification data
router.post("/recruiter-verification", async (req, res) => {
  const {
    companyName,
    industry,
    companySize,
    companyAddress,
    companyWebsite,
    logo,
    banner,
    description,
    foundedYear,
    workEmail,
    phoneNumber,
    linkedinProfile,
    numEmployees,
    companyImages,
    companyPerks,
    googleMapsUrl,
    googleMapsIframe,
    businessRegNumber,
    CEOfullName,
    taxId,
    recruitingLicense,
    additionalInfo,
    user_id,
  } = req.body;

  // Convert companySize to enum value
  let size;
  if (companySize === "1-50") size = "Small (1-50 employees)";
  else if (companySize === "51-200") size = "Medium (51-200 employees)";
  else size = "Large (+200 employees)";

  try {
    await db.query(
      `
      INSERT INTO companies (
        name,
        industry,
        size,
        company_address,
        website,
        logo,
        banner,
        description,
        founded_year,
        contact_email,
        contact_phone,
        linkedin_url,
        num_employees,
        company_images,
        company_perks,
        google_maps_url,
        google_maps_iframe,
        business_reg_number,
        ceo_full_name,
        tax_id,
        recruiting_license,
        additional_info,
        user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        companyName,
        industry,
        size,
        companyAddress,
        companyWebsite,
        logo || null,
        banner || null,
        description,
        foundedYear,
        workEmail,
        phoneNumber,
        linkedinProfile,
        numEmployees,
        companyImages,
        companyPerks,
        googleMapsUrl,
        googleMapsIframe,
        businessRegNumber,
        CEOfullName,
        taxId,
        recruitingLicense,
        additionalInfo,
        user_id,
      ]
    );
    res.status(200).json({ message: "Company details submitted successfully" });
  } catch (err) {
    console.error("Error submitting company details:", err);
    res
      .status(500)
      .json({ error: "An error occurred while submitting company details" });
  }
});

// Route for submitting job offer data
router.post("/job-offer", async (req, res) => {
  const {
    title,
    description,
    location,
    employment_type,
    salary,
    requirements,
    benefits,
    application_deadline,
    short_description,
    experience,
    user_id,
    job_sector,
  } = req.body;

  try {
    const [companyResult] = await db.query(
      "SELECT company_id FROM companies WHERE user_id=?",
      [user_id]
    );

    if (companyResult.length === 0) {
      return res.status(404).json({ error: "Company not found for the user" });
    }

    const company_id = companyResult[0].company_id;

    await db.query(
      `
      INSERT INTO job_offers (
        title,
        description,
        company_id,
        location,
        employment_type,
        salary,
        requirements,
        benefits,
        application_deadline,
        short_description,
        experience,
        user_id,
        job_sector
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        title,
        description,
        company_id,
        location,
        employment_type,
        salary,
        requirements,
        benefits,
        application_deadline,
        short_description,
        experience,
        user_id,
        job_sector,
      ]
    );

    res
      .status(200)
      .json({ message: "Job offer details submitted successfully" });
  } catch (err) {
    console.error("Error processing job offer:", err);
    res
      .status(500)
      .json({ error: "An error occurred while processing job offer" });
  }
});

export default router;
