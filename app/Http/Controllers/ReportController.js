const WalletService = require("../../Services/WalletService");
const TransactionService = require("../../Services/TransactionService");
const CategoryService = require("../../Services/CategoryService");

class ReportController {
  async index(req, res) {
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    const categories = await CategoryService.listCategories();
    res.render("reports/index", { wallets, categories, title: "Rapports" });
  }

  async export(req, res) {
    try {
      const wallets = await WalletService.listUserWallets(req.session.user.id);
      let csv = "Date,Reference,Category,Deposit,Withdraw,Wallet\n";
      
      for (const wallet of wallets) {
        const transactions = await TransactionService.findByWallet(wallet.id);
        for (const transaction of transactions) {
          csv += `${transaction.createdAt.toISOString().split('T')[0]},${transaction.reference},${wallet.Category.title},${transaction.deposit},${transaction.withdraw},${wallet.id}\n`;
        }
      }
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
      res.send(csv);
    } catch (err) {
      res.status(500).send("Erreur lors de l'export");
    }
  }
}

module.exports = new ReportController();
