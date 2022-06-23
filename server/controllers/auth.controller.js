const userModel = require("../models/user.model");
const { signUpErrors, logInErrors } = require("../utils/errors.utils");
const jwt = require("jsonwebtoken");

const maxAge = 2 * 24 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.create({ username, password });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.login(username, password);
    const token = createToken(user._id, user.role);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = logInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logOut = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};