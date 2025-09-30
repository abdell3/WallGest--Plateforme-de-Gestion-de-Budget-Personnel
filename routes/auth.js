const express = require("express");
const router = express.Router();
const AuthController = require("../app/Http/Controllers/AuthController");

router.get("/register", (req, res) => AuthController.registerForm(req, res));
router.post("/register", (req, res) => AuthController.register(req, res));

router.get("/login", (req, res) => AuthController.loginForm(req, res));
router.post("/login", (req, res) => AuthController.login(req, res));

router.get("/profile", (req, res) => AuthController.profile(req, res));

router.get("/logout", (req, res) => AuthController.logout(req, res));

module.exports = router;
