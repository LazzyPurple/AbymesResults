const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/database");

const app = express();

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
