const WalletService = require("../../Services/WalletService");
const CategoryService = require("../../Services/CategoryService");

class WalletController {
  
  async index(req, res) {
    const wallets = await WalletService.listUserWallets(req.session.user.id);
    const categories = await CategoryService.listCategories();
    res.render("wallets/index", { wallets, categories, title: "Portefeuilles" });
  }

  async create(req, res) {
    try {
      const { categoryId } = req.body;
      await WalletService.createWallet({
        userId: req.session.user.id,
        categoryId: parseInt(categoryId),
        amountG: 0,
        totalDepo: 0,
        totalWithdraw: 0
      });
      res.redirect("/wallets");
    } catch (err) {
      res.status(500).send("Erreur lors de la création du portefeuille");
    }
  }

  async show(req, res) {
    const wallet = await WalletService.getWallet(req.params.id);
    res.render("wallets/show", { wallet, title: "Portefeuille" });
  }

  async delete(req, res) {
    try {
      await WalletService.deleteWallet(req.params.id);
      res.redirect("/wallets");
    } catch (err) {
      res.status(500).send("Erreur lors de la suppression");
    }
  }
}

module.exports = new WalletController();
