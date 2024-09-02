const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/movies", movieController.getAllMovies);
router.get("/movies/:id", movieController.getMovie);
router.get("/search", movieController.searchMovies); // Nova rota de busca
router.post("/movies", movieController.createMovie);
router.put("/movies/:id", movieController.updateMovie);
router.delete("/movies/:id", movieController.deleteMovie);

module.exports = router;
