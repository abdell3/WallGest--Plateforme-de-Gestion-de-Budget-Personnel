const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../app/Http/Middleware/auth");
const { isAdmin } = require("../app/Http/Middleware/adminAuth");
const DashboardController = require("../app/Http/Controllers/DashboardController");
const CategoryController = require("../app/Http/Controllers/CategoryController");
const AdminController = require("../app/Http/Controllers/AdminController");
const CategoryRequestService = require("../app/Services/CategoryRequestService");
const ReportController = require("../app/Http/Controllers/ReportController");
const WalletService = require("../app/Services/WalletService");
const SavingGoalController = require("../app/Http/Controllers/SavingGoalController");

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
router.post("/dashboard/category-request", isAuthenticated, async (req, res) => {
  try {
    await CategoryRequestService.createRequest({
      title: req.body.title,
      reason: req.body.reason,
      userId: req.session.user.id
    });
    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).send("Erreur lors de la demande");
  }
});

router.get("/admin/dashboard", isAuthenticated, isAdmin, (req, res) => AdminController.dashboard(req, res));
router.get("/admin/users", isAuthenticated, isAdmin, (req, res) => AdminController.users(req, res));
router.get("/admin/categories", isAuthenticated, isAdmin, (req, res) => AdminController.categories(req, res));
router.get("/admin/statistics", isAuthenticated, isAdmin, (req, res) => AdminController.statistics(req, res));
router.post("/admin/requests/:id/approve", isAuthenticated, isAdmin, (req, res) => AdminController.approveRequest(req, res));
router.post("/admin/requests/:id/reject", isAuthenticated, isAdmin, (req, res) => AdminController.rejectRequest(req, res));

router.post("/admin/categories", isAuthenticated, isAdmin, (req, res) => CategoryController.create(req, res));
router.post("/admin/categories/:id/delete", isAuthenticated, isAdmin, (req, res) => CategoryController.delete(req, res));

router.get("/reports/export", isAuthenticated, (req, res) => ReportController.export(req, res));

router.get("/saving-goals", isAuthenticated, (req, res) => SavingGoalController.index(req, res));
router.post("/saving-goals", isAuthenticated, (req, res) => SavingGoalController.create(req, res));
router.get("/saving-goals/:id", isAuthenticated, (req, res) => SavingGoalController.show(req, res));
router.put("/saving-goals/:id", isAuthenticated, (req, res) => SavingGoalController.update(req, res));
router.delete("/saving-goals/:id", isAuthenticated, (req, res) => SavingGoalController.delete(req, res));
router.post("/saving-goals/:id/progress", isAuthenticated, (req, res) => SavingGoalController.addProgress(req, res));

module.exports = router;
