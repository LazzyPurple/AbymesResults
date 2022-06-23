const electionModel = require("../models/election.model");
const { send } = require("express/lib/response");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.readElection = (req, res) => {
  electionModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data: " + err);
    })
    .sort({ createdAt: -1 });
};

module.exports.createElection = async (req, res) => {
  const newElection = new electionModel({
    name: req.body.name,
    electionType: req.body.electionType,
    electeurs: req.body.electeurs,
    votant: req.body.votants,
  });
  try {
    const election = await newElection.save();
    return res.status(201).json(election);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.deleteElection = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown " + req.params.id);

  electionModel
    .findOneAndRemove({ _id: req.params.id })
    .then((docs) => send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.updateElection = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown " + req.params.id);
  electionModel
    .findOneAndUpdate(
      req.params.id,
      { $set: { votants: req.body.votants } },
      { new: true }
    )
    .then((docs) => res.send(docs))
    .catch((err) => res.send({ message: err }));
};
