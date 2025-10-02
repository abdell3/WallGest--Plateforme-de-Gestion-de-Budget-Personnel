const CategoryService = require("../../Services/CategoryService");
const WalletService = require("../../Services/WalletService");
const TransactionService = require("../../Services/TransactionService");

class DashboardController {
  async index(req, res) {
    const categories = await CategoryService.listCategories();
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    
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
      totalBalance,
      totalDeposits,
      totalWithdraws,
      currentView: 'overview',
      title: "Gestion de Portefeuille" 
    });
  }

  async category(req, res) {
    const categories = await CategoryService.listCategories();
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    const categoryId = parseInt(req.params.id, 10);
    const category = await CategoryService.findById(categoryId);
    
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
      currentView: 'category',
      title: `Catégorie: ${category.title}` 
    });
  }

  async addTransaction(req, res) {
    try {
      const { walletId, reference, amount, type } = req.body;
      const wallet = await WalletService.getWallet(walletId);
      const category = await CategoryService.findById(wallet.categoryId);
      
      const amountInt = parseInt(amount);
      
      if (type === 'withdraw') {
        const maxWithdraw = Math.floor(category.budget * 0.65);
        const currentWithdraws = wallet.totalWithdraw || 0;
        
        if (currentWithdraws + amountInt > maxWithdraw) {
          return res.status(400).json({ 
            error: `Retrait refusé. Limite: ${maxWithdraw} MAD (65% du budget)` 
          });
        }
      }
      
      const deposit = type === 'deposit' ? amountInt : 0;
      const withdraw = type === 'withdraw' ? amountInt : 0;
      
      await TransactionService.createTransaction({
        walletId,
        reference,
        deposit,
        withdraw
      });
      
      await WalletService.updateWallet(walletId, {
        amountG: wallet.amountG + deposit - withdraw,
        totalDepo: wallet.totalDepo + deposit,
        totalWithdraw: wallet.totalWithdraw + withdraw
      });
      
      res.redirect(`/dashboard/category/${wallet.categoryId}`);
    } catch (err) {
      res.status(500).send("Erreur lors de la transaction");
    }
  }

  async updateBudget(req, res) {
    try {
      const { categoryId, budget } = req.body;
      await CategoryService.updateCategory(categoryId, { budget: parseInt(budget) });
      res.redirect(`/dashboard/category/${categoryId}`);
    } catch (err) {
      res.status(500).send("Erreur lors de la mise à jour du budget");
    }
  }
}

module.exports = new DashboardController();
