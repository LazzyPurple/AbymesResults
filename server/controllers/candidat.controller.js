const candidatModel = require("../models/candidat.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.createCandidat = async (req, res) => {
  const newCandidat = new candidatModel({
    name: req.body.name,
    partie: req.body.partie,
    electionId: req.body.electionId,
  });
  try {
    const candidat = await newCandidat.save();
    return res.status(201).json(candidat);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports.readCandidat = (req, res) => {
  candidatModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to log data: " + err);
  });
};

module.exports.deleteCandidat = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);
  await candidatModel
    .findOneAndRemove(req.params.id)
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).json({ message: err }));
};

module.exports.updateCandidat = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);
  await candidatModel
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          partie: req.body.partie,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    .then((docs) => send.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.voteCandidat = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown :" + req.params.id);
  await candidatModel
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          vote: req.body.vote,
        },
      }
    )
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).json({ message: err }));
};

module.exports.getResults = async (req, res) => {
  const result = await candidatModel.aggregate([
    {
      $addFields: {
        voteTotal: {
          $sum: "$vote",
        },
      },
    },
    {
      $group: {
        _id: null,
        sum: {
          $sum: "$voteTotal",
        },
        users: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $unwind: {
        path: "$users",
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            {
              percent: {
                $multiply: [
                  {
                    $divide: ["$users.voteTotal", "$sum"],
                  },
                  100,
                ],
              },
            },
            "$users",
          ],
        },
      },
    },
    {
      $sort: {
        voteTotal: -1,
      },
    },
  ]);
  res.json(result);
};
