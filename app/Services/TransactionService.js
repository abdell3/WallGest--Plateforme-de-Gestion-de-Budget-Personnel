const TransactionRepository = require("../Repositories/TransactionRepository");

class TransactionService {
  async listAll() {
    return await TransactionRepository.findAll();
  }

  async findByWallet(walletId) {
    return await TransactionRepository.findByWallet(walletId);
  }
  
  async findById(id) {
    return await TransactionRepository.findById(id);
  }
  
  async createTransaction(data) {
    return await TransactionRepository.create(data);
  }
  
  async updateTransaction(id, data) {
    return await TransactionRepository.update(id, data);
  }
  
  async deleteTransaction(id) {
    return await TransactionRepository.delete(id);
  }
}

module.exports = new TransactionService();
