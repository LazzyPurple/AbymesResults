const mongoose = require("mongoose");

const db = mongoose
  .connect(`mongodb://localhost:27017/AbymesResultat`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

module.exports = db;
