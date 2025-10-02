const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../app/Http/Middleware/auth");
const DashboardController = require("../app/Http/Controllers/DashboardController");
const CategoryController = require("../app/Http/Controllers/CategoryController");
const ReportController = require("../app/Http/Controllers/ReportController");
const WalletService = require("../app/Services/WalletService");

router.get("/", async (req, res) => {
  let userSummary = null;
  if (req.session.user) {
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    userSummary = {
      solde: wallets.reduce((sum, w) => sum + (w.amountG || 0), 0),
      totalDepo: wallets.reduce((sum, w) => sum + (w.totalDepo || 0), 0),
      totalWithdraw: wallets.reduce((sum, w) => sum + (w.totalWithdraw || 0), 0)
    };
  }
  res.render("home", { title: "Accueil", userSummary });
});

router.get("/login", (req, res) => res.redirect("/auth/login"));
router.get("/register", (req, res) => res.redirect("/auth/register"));
router.get("/profile", (req, res) => res.redirect("/auth/profile"));

router.get("/dashboard", isAuthenticated, (req, res) => DashboardController.index(req, res));
router.get("/dashboard/category/:id", isAuthenticated, (req, res) => DashboardController.category(req, res));
router.post("/dashboard/transaction", isAuthenticated, (req, res) => DashboardController.addTransaction(req, res));
router.post("/dashboard/budget", isAuthenticated, (req, res) => DashboardController.updateBudget(req, res));

router.post("/categories", isAuthenticated, (req, res) => CategoryController.create(req, res));
router.post("/categories/:id/delete", isAuthenticated, (req, res) => CategoryController.delete(req, res));

router.get("/reports/export", isAuthenticated, (req, res) => ReportController.export(req, res));

module.exports = router;
