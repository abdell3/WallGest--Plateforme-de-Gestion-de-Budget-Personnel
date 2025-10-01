const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../app/Http/Middleware/auth");

router.get("/", (req, res) => {
  res.render("home", { title: "Accueil" });
});

router.get("/login", (req, res) => res.redirect("/auth/login"));
router.get("/register", (req, res) => res.redirect("/auth/register"));
router.get("/profile", (req, res) => res.redirect("/auth/profile"));

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
});

module.exports = router;
