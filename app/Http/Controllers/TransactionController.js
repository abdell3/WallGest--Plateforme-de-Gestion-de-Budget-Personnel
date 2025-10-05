const TransactionService = require("../../Services/TransactionService");
const WalletService = require("../../Services/WalletService");
const CategoryService = require("../../Services/CategoryService");

class TransactionController {
  async index(req, res) {
    const categories = await CategoryService.listCategories();
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    res.render("transactions/index", { categories, wallets, title: "Transactions" });
  }

  async create(req, res) {
    try {
      const { 
        walletId, 
        reference, 
        amount, 
        type } = req.body;
      
      const deposit = type === 'deposit' ? parseInt(amount) : 0;
      const withdraw = type === 'withdraw' ? parseInt(amount) : 0;

      const transaction = await TransactionService.createTransactionWithValidation(walletId, {
        reference,
        deposit,
        withdraw
      });

      res.redirect("/transactions");
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async edit(req, res) {
    const transaction = await TransactionService.findById(req.params.id);
    const categories = await CategoryService.listCategories();
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    res.render("transactions/edit", { transaction, categories, wallets, title: "Modifier transaction" });
  }

  async update(req, res) {
    try {
      const { reference, amount, type } = req.body;
      const transaction = await TransactionService.findById(req.params.id);
      if (!transaction) return res.status(404).send("Transaction non trouvée");

      const deposit = type === 'deposit' ? parseInt(amount) : 0;
      const withdraw = type === 'withdraw' ? parseInt(amount) : 0;

      await TransactionService.updateTransaction(req.params.id, {
        reference,
        deposit,
        withdraw
      });

      res.redirect("/transactions");
    } catch (err) {
      res.status(500).send("Erreur lors de la mise à jour");
    }
  }

  async delete(req, res) {
    try {
      await TransactionService.deleteTransaction(req.params.id);
      res.redirect("/transactions");
    } catch (err) {
      res.status(500).send("Erreur lors de la suppression");
    }
  }
}

module.exports = new TransactionController();
