const CategoryService = require("../../Services/CategoryService");
const CategoryRequestService = require("../../Services/CategoryRequestService");
const UserService = require("../../Services/UserService");
const WalletService = require("../../Services/WalletService");
const TransactionService = require("../../Services/TransactionService");

class AdminController {

  async dashboard(req, res) {
    const pendingRequests = await CategoryRequestService.listPendingRequests();
    res.render("admin/dashboard", { 
      pendingRequests, 
      title: "Admin Dashboard", 
      layout: "layouts/admin" 
    });
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
    res.render("admin/users", { 
      users, 
      title: "Gestion Utilisateurs", 
      layout: "layouts/admin" 
    });
  }

  async categories(req, res) {
    const categories = await CategoryService.listCategories();
    res.render("admin/categories", { 
      categories, 
      title: "Gestion Catégories", 
      layout: "layouts/admin" 
    });
  }

  async statistics(req, res) {
    const stats = await this.calculateStatistics();
    res.render("admin/transactions", { 
      stats, 
      title: "Statistiques Plateforme", 
      layout: "layouts/admin" 
    });
  }

  async calculateStatistics() {
    const totalUsers = await UserService.countUsers();
    const totalTransactions = await TransactionService.countTransactions();
    const totalDeposits = await TransactionService.getTotalDeposits();
    const totalWithdrawals = await TransactionService.getTotalWithdrawals();
    
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const newUsersThisMonth = await UserService.countUsersSince(oneMonthAgo);
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newUsersThisWeek = await UserService.countUsersSince(oneWeekAgo);
    const transactionsThisWeek = await TransactionService.countTransactionsSince(oneWeekAgo);
    const categoriesThisWeek = await CategoryService.countCategoriesSince(oneWeekAgo);

    return {
      totalUsers,
      totalTransactions,
      totalDeposits,
      totalWithdrawals,
      newUsersThisMonth,
      newUsersThisWeek,
      transactionsThisWeek,
      categoriesThisWeek
    };
  }
}

module.exports = new AdminController();
