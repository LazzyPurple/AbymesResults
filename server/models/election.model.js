const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    electionType: {
      type: String,
      enum: ["Législative", "Présidentielle"],
      required: true,
    },
    electeurs: {
      type: Number,
      required: true,
    },
    votants: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("election", electionSchema);