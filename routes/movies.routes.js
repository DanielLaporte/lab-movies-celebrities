// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express.Router();
const Movie = require("/models/movie.model");
const Celebrity = require("/models/celebrity.model");

// Route to show form for creating a new movie
router.get("/create", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("/movies/new-movie", { celebrities });
  } catch (error) {
    res.render("error", { error: "Error fetching celebrities" });
  }
});

// Route to handle form submission and create a new movie
router.post("/create", async (req, res) => {
  try {
    await Movie.create(req.body);
    res.redirect("/movies");
  } catch (error) {
    res.render("movies/new-movie", { error: "Error creating movie" });
  }
});

// Route to display all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    res.render("error", { error: "Error fetching movies" });
  }
});

// Route to display details of a specific movie
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { movie });
  } catch (error) {
    res.render("error", { error: "Error fetching movie details" });
  }
});

// Route to handle movie deletion
router.post("/:id/delete", async (req, res) => {
  try {
    await Movie.findByIdAndRemove(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    res.render("error", { error: "Error deleting movie" });
  }
});

// Route to show form for editing a movie
router.get("/:id/edit", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", { movie, celebrities });
  } catch (error) {
    res.render("error", { error: "Error fetching movie details" });
  }
});

// Route to handle form submission and update a movie
router.post("/:id/edit", async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/movies/${req.params.id}`);
  } catch (error) {
    res.render("error", { error: "Error updating movie" });
  }
});

module.exports = router;