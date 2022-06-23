const userModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await userModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID Unknow :" + req.params.id);
  userModel
    .findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID Unknow :" + err);
    })
    .select("-password");
};

module.exports.userUpdate = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);
  try {
    await userModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            username: req.body.username,
            role: req.body.role,
          },
        },
        { new: true, upsert: true, setDefaultsonInsert: true }
      )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.userUpdate = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);
  try {
    await userModel
      .findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            username: req.body.username,
            role: req.body.role,
          },
        },
        { new: true, upsert: true, setDefaultsonInsert: true }
      )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.userDelete = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknow :" + req.params.id);
  try {
    await userModel
      .findOneAndRemove({ _id: req.params.id })
      .then((docs) => res.send(docs)) //output if sucess
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
