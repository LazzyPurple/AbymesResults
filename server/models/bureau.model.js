const mongoose = require("mongoose");

const bureauSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
      maxlength: 6,
    },
    canton: {
      type: Number,
      required: true,
      maxLength: 3,
    },
  },
  { timestamps: true }
);

const bureauModel = mongoose.model("bureau", bureauSchema);

module.exports = bureauModel;