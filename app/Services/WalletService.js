const WalletRepository = require("../Repositories/WalletRepository");
const TransactionRepository = require("../Repositories/TransactionRepository");

class WalletService {
  async listUserWallets(userId) { return await WalletRepository.findByUser(userId); }
  async getWallet(id) { return await WalletRepository.findById(id); }
  async createWallet(data) { return await WalletRepository.create(data); }
  async updateWallet(id, data) { return await WalletRepository.update(id, data); }
  async deleteWallet(id) { return await WalletRepository.delete(id); }

  async addTransaction(walletId, { reference, deposit = 0, withdraw = 0 }) {
    const trx = await TransactionRepository.create({ walletId, reference, deposit, withdraw });
    return trx;
  }
}

module.exports = new WalletService();

