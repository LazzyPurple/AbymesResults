const mongoose = require("mongoose");
const db = require("../config/database");

const candidatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    partie: {
      type: String,
      required: true,
    },
    electionId: {
      type: String,
      required: true,
    },
    voteTotal: {
      type: String,
    },
    vote: {
      type: Number,
    },
  },
  { timestamps: true }
);

const candidatModel = mongoose.model("Candidat", candidatSchema);

module.exports = candidatModel;
