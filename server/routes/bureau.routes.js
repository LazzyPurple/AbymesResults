const router = require("express").Router();
const bureauController = require("../controllers/bureau.controller");

//CRUD Bureau
router.post("/", bureauController.createBureau);
router.get("/", bureauController.readBureau);
router.put("/:id", bureauController.updateBureau);
router.delete("/:id", bureauController.deleteBureau);

module.exports = router;
