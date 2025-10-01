const express = require("express");
const router = express.Router();
const AuthController = require("../app/Http/Controllers/AuthController");

router.get("/login", AuthController.loginForm);
router.get("/register", AuthController.registerForm);
router.get("/profile", AuthController.profile);

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/logout", AuthController.logout);

module.exports = router;
