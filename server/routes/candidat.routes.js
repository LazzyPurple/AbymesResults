const candidatController = require("../controllers/candidat.controller");
const router = require("express").Router()

//CRUD routes
router.post("/", candidatController.createCandidat);
router.get("/", candidatController.readCandidat);
router.put("/:id", candidatController.updateCandidat);
router.delete("/:id", candidatController.deleteCandidat);

//Results
router.put("/vote/:id", candidatController.voteCandidat);
router.get("/results", candidatController.getResults)

module.exports = router;
