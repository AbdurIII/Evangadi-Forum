const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the database
dbConnection.getConnection((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to the freesqldatabase successfully!");
});

module.exports = dbConnection.promise();
