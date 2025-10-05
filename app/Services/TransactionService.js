const TransactionRepository = require("../Repositories/TransactionRepository");
const WalletRepository = require("../Repositories/WalletRepository");
const SavingGoalService = require("./SavingGoalService");

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

  async validateTransaction(walletId, deposit, withdraw) {
    const wallet = await WalletRepository.findById(walletId);
    if (!wallet) {
      return { valid: false, message: "Portefeuille non trouvé" };
    }

    if (withdraw > 0) {
      const newBalance = wallet.amountG - withdraw;
      
      if (newBalance < 0) {
        return { 
          valid: false, 
          message: "Solde insuffisant pour effectuer ce retrait" 
        };
      }

      const maxWithdrawal = wallet.Category.budget * 0.65;
      const currentWithdrawals = wallet.totalWithdraw + withdraw;
      
      if (currentWithdrawals > maxWithdrawal) {
        return {
          valid: false,
          message: `Retrait impossible: Vous ne pouvez pas retirer plus de 65% du budget (${Math.floor(maxWithdrawal)} MAD) pour la catégorie ${wallet.Category.title}`
        };
      }

      const savingGoalsValidation = await SavingGoalService.validateSavingGoals(
        wallet.userId, 
        wallet.categoryId, 
        withdraw
      );
      
      if (!savingGoalsValidation.valid) {
        return savingGoalsValidation;
      }
    }

    return { valid: true };
  }

  async createTransactionWithValidation(walletId, { reference, deposit = 0, withdraw = 0 }) {
    const validation = await this.validateTransaction(walletId, deposit, withdraw);
    
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    const transaction = await this.createTransaction({
      walletId,
      reference,
      deposit,
      withdraw
    });

    const wallet = await WalletRepository.findById(walletId);
    await WalletRepository.update(walletId, {
      amountG: wallet.amountG + deposit - withdraw,
      totalDepo: wallet.totalDepo + deposit,
      totalWithdraw: wallet.totalWithdraw + withdraw
    });

    if (deposit > 0) {
      const savingGoals = await SavingGoalService.getCategorySavingGoals(wallet.categoryId, wallet.userId);
      for (const goal of savingGoals) {
        if (goal.status === 'active') {
          await SavingGoalService.updateSavingGoalProgress(goal.id, deposit);
        }
      }
    }

    return transaction;
  }
}

module.exports = new TransactionService();
