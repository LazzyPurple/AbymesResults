const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
require("./config/database");

const app = express();

//CORS setup
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

//routes links
const userRoutes = require("./routes/user.routes");
const candidatRoutes = require("./routes/candidat.routes");
const electionRoutes = require("./routes/election.routes");
const bureauRoutes = require("./routes/bureau.routes");

//middlewares link
const { checkUser, requireAuth } = require("./middlewares/auth.middleware");

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//JWT
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/candidat", candidatRoutes);
app.use("/api/election", electionRoutes);
app.use("/api/bureau", bureauRoutes);

// server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
