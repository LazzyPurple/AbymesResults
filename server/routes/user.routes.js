const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

//authentication routes
router.post("/register", authController.signUp);
router.post("/login", authController.logIn);
router.get("/logout", authController.logOut);

//CRUD routes
router.get("/:id", userController.userInfo);
router.get("/", userController.getAllUsers);
router.put("/:id", userController.userUpdate);
router.delete("/:id", userController.userDelete);

module.exports = router;
