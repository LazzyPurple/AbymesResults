const bureauModel = require("../models/bureau.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.readBureau = (req, res) => {
  bureauModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data:" + err);
    })
    .sort({ createdAt: 1 });
};

module.exports.createBureau = async (req, res) => {
  const { name, code, canton } = req.body;

  try {
    const bureau = await bureauModel.create({ name, code, canton });
    return res.status(201).json({ bureau: bureau._id });
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.updateBureau = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  bureauModel
    .findByIdAndUpdate(
      req.params.id,
      { $set: { name: req.body.message } },
      { new: true }
    )
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.deleteBureau = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);
  bureauModel
    .findByIdAndRemove({ _id: req.params.id })
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};
