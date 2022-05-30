const userModel = require("../models/user.model");

module.exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.create({ username, password });
    res.status(201).json({ user: user._id });
  } catch (error) {
    res.status(200).send({ error });
  }
};
