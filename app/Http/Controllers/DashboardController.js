const CategoryService = require("../../Services/CategoryService");
const WalletService = require("../../Services/WalletService");
const TransactionService = require("../../Services/TransactionService");
const SavingGoalService = require("../../Services/SavingGoalService");

class DashboardController {
  async index(req, res) {
    const categories = await CategoryService.listCategories();
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    const savingGoals = await SavingGoalService.listUserSavingGoals(req.session.user.id);
    
    let totalBalance = 0;
    let totalDeposits = 0;
    let totalWithdraws = 0;
    
    for (const wallet of wallets) {
      totalBalance += wallet.amountG || 0;
      totalDeposits += wallet.totalDepo || 0;
      totalWithdraws += wallet.totalWithdraw || 0;
    }
    
        res.render("dashboard", { 
          categories, 
          wallets,
          savingGoals,
          totalBalance,
          totalDeposits,
          totalWithdraws,
          currentView: 'overview',
          title: "Gestion de Portefeuille",
          layout: "layouts/dashboard"
        });
  }

  async category(req, res) {
    const categories = await CategoryService.listCategories();
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    const categoryId = parseInt(req.params.id, 10);
    const category = await CategoryService.findById(categoryId);
    const savingGoals = await SavingGoalService.getCategorySavingGoals(categoryId, req.session.user.id);
    
    let wallet = wallets.find(w => w.categoryId === categoryId);
    if (!wallet) {
      wallet = await WalletService.createWallet({
        userId: req.session.user.id,
        categoryId: categoryId,
        amountG: 0,
        totalDepo: 0,
        totalWithdraw: 0
      });
    }
    
    const transactions = await TransactionService.findByWallet(wallet.id);
    
        res.render("dashboard", { 
          categories, 
          wallets,
          currentCategory: category,
          currentWallet: wallet,
          transactions,
          savingGoals,
          currentView: 'category',
          title: `Catégorie: ${category.title}`,
          layout: "layouts/dashboard",
          req
        });
  }

  async addTransaction(req, res) {
    try {
      const { walletId, reference, amount, type } = req.body || {};
      
      if (!walletId) {
        return res.redirect(`/dashboard/category/${req.params.id || ''}?error=Wallet ID is required`);
      }
      
      const wallet = await WalletService.getWallet(walletId);
      if (!wallet) {
        return res.redirect(`/dashboard/category/${req.params.id || ''}?error=Wallet not found`);
      }
      
      const amountInt = parseInt(amount);
      const deposit = type === 'deposit' ? amountInt : 0;
      const withdraw = type === 'withdraw' ? amountInt : 0;
      
      await TransactionService.createTransactionWithValidation(walletId, {
        reference,
        deposit,
        withdraw
      });
      
      res.redirect(`/dashboard/category/${wallet.categoryId}?success=Transaction created successfully`);
    } catch (err) {
      const categoryId = req.params.id || '';
      res.redirect(`/dashboard/category/${categoryId}?error=${encodeURIComponent(err.message)}`);
    }
  }

  async updateBudget(req, res) {
    try {
      const { categoryId, budget } = req.body;
      await CategoryService.updateCategory(categoryId, 
        { 
          budget: parseInt(budget) 
        });
      res.redirect(`/dashboard/category/${categoryId}`);
    } catch (err) {
      res.status(500).send("Erreur lors de la mise à jour du budget");
    }
  }
}

module.exports = new DashboardController();
