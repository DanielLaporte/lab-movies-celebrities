// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express");
const router = express.Router();
const Celebrity = require("/models/celebrity.model");

// Route to show form for creating a new celebrity
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

// Route to handle form submission and create a new celebrity
router.post("/create", async (req, res) => {
  try {
    await Celebrity.create(req.body);
    res.redirect("/celebrities");
  } catch (error) {
    res.render("celebrities/new-celebrity", { error: "Error creating celebrity" });
  }
});

// Route to display all celebrities
router.get("/", async (req, res) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    res.render("error", { error: "Error fetching celebrities" });
  }
});

module.exports = router;