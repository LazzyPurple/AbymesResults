const electionController = require("../controllers/election.controller");
const router = require("express").Router();

//Election CRUD
router.get("/", electionController.readElection);
router.post("/", electionController.createElection);
router.put("/:id", electionController.updateElection);
router.delete("/:id", electionController.deleteElection);

module.exports = router;
