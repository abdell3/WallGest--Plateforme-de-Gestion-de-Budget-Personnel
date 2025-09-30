const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../app/Http/Middleware/auth");

router.get("/", (req, res) => {
  res.render("home", { title: "Accueil" });
});

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.session.user, title: "Dashboard" });
});

module.exports = router;
