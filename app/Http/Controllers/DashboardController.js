const CategoryService = require("../../Services/CategoryService");
const WalletService = require("../../Services/WalletService");

class DashboardController {
  async index(req, res) {
    const categories = await CategoryService.listCategories();
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    res.render("dashboard", { 
      categories, 
      wallets, 
      title: "Dashboard" 
    });
  }

  async category(req, res) {
    const categories = await CategoryService.listCategories();
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    const current = wallets.find(w => String(w.categoryId) === req.params.id) || null;
    res.render("dashboard", { 
      categories, 
      wallets, 
      currentCategoryId: 
      parseInt(req.params.id, 10), 
      current, 
      title: "Dashboard" 
    });
  }
}

module.exports = new DashboardController();
