const CategoryService = require("../../Services/CategoryService");
const CategoryRequestService = require("../../Services/CategoryRequestService");
const UserService = require("../../Services/UserService");
const WalletService = require("../../Services/WalletService");
const TransactionService = require("../../Services/TransactionService");

class AdminController {
  async dashboard(req, res) {
    const categories = await CategoryService.listCategories();
    const requests = await CategoryRequestService.listRequests();
    const users = await UserService.listUsers();
    res.render("admin/dashboard", { categories, requests, users, title: "Admin Dashboard" });
  }

  async approveRequest(req, res) {
    try {
      await CategoryRequestService.updateRequest(req.params.id, { status: 'approved' });
      const request = await CategoryRequestService.listRequests();
      const approvedRequest = request.find(r => r.id == req.params.id);
      if (approvedRequest) {
        await CategoryService.createCategory({ title: approvedRequest.title, budget: 0 });
      }
      res.redirect("/admin/dashboard");
    } catch (err) {
      res.status(500).send("Erreur lors de l'approbation");
    }
  }

  async rejectRequest(req, res) {
    try {
      await CategoryRequestService.updateRequest(req.params.id, { status: 'rejected' });
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
