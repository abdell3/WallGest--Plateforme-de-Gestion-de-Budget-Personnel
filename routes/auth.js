const express = require("express");
const router = express.Router();
const AuthController = require("../app/Http/Controllers/AuthController");

router.get("/register", AuthController.registerForm);
router.post("/register", AuthController.register);

router.get("/login", AuthController.loginForm);
router.post("/login", AuthController.login);

router.get("/profile", AuthController.profile);

router.get("/logout", AuthController.logout);

module.exports = router;
