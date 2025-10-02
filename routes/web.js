const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../app/Http/Middleware/auth");
const DashboardController = require("../app/Http/Controllers/DashboardController");
const TransactionController = require("../app/Http/Controllers/TransactionController");
const CategoryController = require("../app/Http/Controllers/CategoryController");
const WalletController = require("../app/Http/Controllers/WalletController");
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

router.get("/transactions", isAuthenticated, (req, res) => TransactionController.index(req, res));
router.post("/transactions", isAuthenticated, (req, res) => TransactionController.create(req, res));
router.get("/transactions/:id/edit", isAuthenticated, (req, res) => TransactionController.edit(req, res));
router.post("/transactions/:id/update", isAuthenticated, (req, res) => TransactionController.update(req, res));
router.post("/transactions/:id/delete", isAuthenticated, (req, res) => TransactionController.delete(req, res));

router.get("/categories", isAuthenticated, (req, res) => CategoryController.index(req, res));
router.post("/categories", isAuthenticated, (req, res) => CategoryController.create(req, res));
router.get("/categories/:id/edit", isAuthenticated, (req, res) => CategoryController.edit(req, res));
router.post("/categories/:id/update", isAuthenticated, (req, res) => CategoryController.update(req, res));
router.post("/categories/:id/delete", isAuthenticated, (req, res) => CategoryController.delete(req, res));

router.get("/wallets", isAuthenticated, (req, res) => WalletController.index(req, res));
router.post("/wallets", isAuthenticated, (req, res) => WalletController.create(req, res));
router.get("/wallets/:id", isAuthenticated, (req, res) => WalletController.show(req, res));
router.post("/wallets/:id/delete", isAuthenticated, (req, res) => WalletController.delete(req, res));

router.get("/reports", isAuthenticated, (req, res) => ReportController.index(req, res));
router.get("/reports/export", isAuthenticated, (req, res) => ReportController.export(req, res));

module.exports = router;
