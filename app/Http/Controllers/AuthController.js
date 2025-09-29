const { User, Role } = require("../../../database/models");

class AuthController {
  static registerForm(req, res) {
    res.render("auth/register", { error: null });
  }

  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const role = await Role.findOne({ where: { name: "user" } });

      const user = await User.create({
        name,
        email,
        password,
        roleId: role.id
      });

      req.session.user = user;
      res.redirect("/auth/profile");
    } catch (err) {
      console.error(err);
      res.render("auth/register", { error: "Erreur lors de l'inscription" });
    }
  }

  static loginForm(req, res) {
    res.render("auth/login", { error: null });
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email }, include: Role });

      if (!user || !(await user.validPassword(password))) {
        return res.render("auth/login", { error: "Identifiants invalides" });
      }

      req.session.user = user;
      res.redirect("/auth/profile");
    } catch (err) {
      console.error(err);
      res.render("auth/login", { error: "Erreur lors de la connexion" });
    }
  }

  static async profile(req, res) {
    if (!req.session.user) return res.redirect("/auth/login");
    res.render("auth/profile", { user: req.session.user });
  }

  static logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/auth/login");
    });
  }
}

module.exports = AuthController;
