const mongoose = require("mongoose");

const db = mongoose
  .connect(process.env.DB_USER_PASS)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

module.exports = db;
