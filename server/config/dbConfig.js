import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "your_database_name",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Handle unexpected errors by logging them
pool.on("error", (err) => {
  console.error("Database pool error:", err);
});

// Gracefully shut down the pool when the application exits
process.on("SIGINT", () => {
  pool.end().then(() => {
    console.log("Database pool closed.");
    process.exit(0);
  });
});

export default pool;
