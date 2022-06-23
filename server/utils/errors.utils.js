module.exports.signUpErrors = (err) => {
  let errors = { username: "", password: "" };

  if (err.message.includes("username"))
    errors.username = "Username incorrect ou déjà utilisé";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  return errors;
};

module.exports.logInErrors = (err) => {
  let errors = { username: "", password: "" };

  if (err.message.includes("username"))
    errors.username =
      "Utilisateur non reconnu, veuillez contacter un administrateur.";

  if (err.message.includes("password"))
    errors.password = "Votre mot de passe est incorrect.";

  return errors;
};
