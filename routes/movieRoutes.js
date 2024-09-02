const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/movies", movieController.getAllMovies);
router.get("/movies/:id", movieController.getMovie);
router.get("/search", movieController.searchMovies);
router.post("/movies", movieController.createMovie);
router.put("/movies/:id", movieController.updateMovie);

router.post("/favorites", movieController.addFavorite);
router.get("/favorites", movieController.getFavorites);
router.put("/favorites/:id", movieController.updateFavorite);

module.exports = router;
