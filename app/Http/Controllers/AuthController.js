const UserService = require("../../Services/UserService");

class AuthController {
  registerForm(req, res) {
    res.render("auth/register", { title: "Inscription" });
  }

  async register(req, res) {
    try {
      const { fName, lName, email, password } = req.body;
      await UserService.registerUser({ fName, lName, email, password });
      res.redirect("/auth/login");
    } catch (err) {
      res.status(500).send("Erreur lors de l'inscription");
    }
  }

  loginForm(req, res) {
    res.render("auth/login", { title: "Connexion" });
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserService.authenticate(email, password);

      if (!user) {
        return res.status(401).send("Email ou mot de passe invalide");
      }

      req.session.user = user;
      res.redirect("/auth/profile");
    } catch (err) {
      res.status(500).send("Erreur lors de la connexion");
    }
  }

  profile(req, res) {
    if (!req.session.user) return res.redirect("/auth/login");
    res.render("auth/profile", { user: req.session.user, title: "Mon profil" });
  }

  logout(req, res) {
    req.session.destroy(() => res.redirect("/"));
  }
}

module.exports = new AuthController();
