const SavingGoalRepository = require("../Repositories/SavingGoalRepository");

class SavingGoalService {
  async listUserSavingGoals(userId) { 
    return await SavingGoalRepository.findByUser(userId); 
  }

  async getSavingGoal(id) { 
    return await SavingGoalRepository.findById(id); 
  }

  async createSavingGoal(data) { 
    return await SavingGoalRepository.create(data); 
  }

  async updateSavingGoal(id, data) { 
    return await SavingGoalRepository.update(id, data); 
  }

  async deleteSavingGoal(id) { 
    return await SavingGoalRepository.delete(id); 
  }

  async getCategorySavingGoals(categoryId, userId) {
    return await SavingGoalRepository.findByCategory(categoryId, userId);
  }

  async updateSavingGoalProgress(id, amount) {
    return await SavingGoalRepository.updateProgress(id, amount);
  }

  async validateSavingGoals(userId, categoryId, withdrawalAmount) {
    const savingGoals = await this.getCategorySavingGoals(categoryId, userId);
    
    for (const goal of savingGoals) {
      const remainingAmount = goal.targetAmount - goal.currentAmount;
      if (withdrawalAmount > remainingAmount) {
        return {
          valid: false,
          message: `Retrait impossible: Vous devez maintenir ${remainingAmount} MAD pour votre objectif d'épargne "${goal.title}"`
        };
      }
    }
    
    return { valid: true };
  }
}

module.exports = new SavingGoalService();
