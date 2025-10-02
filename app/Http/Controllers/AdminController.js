const CategoryService = require("../../Services/CategoryService");
const CategoryRequestService = require("../../Services/CategoryRequestService");
const UserService = require("../../Services/UserService");
const WalletService = require("../../Services/WalletService");
const TransactionService = require("../../Services/TransactionService");

class AdminController {
  async dashboard(req, res) {
    const pendingRequests = await CategoryRequestService.listPendingRequests();
    res.render("admin/dashboard", { pendingRequests, title: "Admin Dashboard" });
  }

  async approveRequest(req, res) {
    try {
      await CategoryRequestService.approveRequest(req.params.id);
      res.redirect("/admin/dashboard");
    } catch (err) {
      res.status(500).send("Erreur lors de l'approbation");
    }
  }

  async rejectRequest(req, res) {
    try {
      await CategoryRequestService.rejectRequest(req.params.id);
      res.redirect("/admin/dashboard");
    } catch (err) {
      res.status(500).send("Erreur lors du rejet");
    }
  }

  async users(req, res) {
    const users = await UserService.listUsers();
    res.render("admin/users", { users, title: "Gestion Utilisateurs" });
  }

  async categories(req, res) {
    const categories = await CategoryService.listCategories();
    res.render("admin/categories", { categories, title: "Gestion Catégories" });
  }

  async transactions(req, res) {
    const transactions = await TransactionService.listAll();
    res.render("admin/transactions", { transactions, title: "Toutes les Transactions" });
  }
}

module.exports = new AdminController();
