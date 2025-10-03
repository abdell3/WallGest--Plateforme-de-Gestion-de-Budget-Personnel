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

  async countTransactions() {
    return await TransactionRepository.count();
  }

  async getTotalDeposits() {
    return await TransactionRepository.getTotalDeposits();
  }

  async getTotalWithdrawals() {
    return await TransactionRepository.getTotalWithdrawals();
  }

  async countTransactionsSince(date) {
    return await TransactionRepository.countSince(date);
  }
}

module.exports = new TransactionService();
