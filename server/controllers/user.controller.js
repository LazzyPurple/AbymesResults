const userModel = require("../models/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

//read all users and a specific user
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

//update a user
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

//delete a user
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
