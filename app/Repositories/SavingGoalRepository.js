const { SavingGoal, User, Category } = require("../../database/models");

class SavingGoalRepository {
  async findByUser(userId) {
    return await SavingGoal.findAll({ 
      where: { 
        userId,
        status: 'active'
      }, 
      include: [{ model: Category }],
      order: [['priority', 'DESC'], ['createdAt', 'DESC']]
    });
  }

  async findById(id) {
    return await SavingGoal.findByPk(id, { 
      include: [Category, User] 
    });
  }

  async create(data) { 
    return await SavingGoal.create(data); 
  }

  async update(id, data) { 
    const item = await SavingGoal.findByPk(id); 
    if (!item) {
      return null; 
    }
    return await item.update(data); 
  }

  async delete(id) { 
    return await SavingGoal.destroy({ 
      where: { id } 
    }); 
  }

  async findByCategory(categoryId, userId) {
    return await SavingGoal.findAll({
      where: {
        categoryId,
        userId,
        status: 'active'
      },
      include: [{ model: Category }]
    });
  }

  async updateProgress(id, amount) {
    const goal = await SavingGoal.findByPk(id);
    if (!goal) return null;
    
    const newAmount = goal.currentAmount + amount;
    const status = newAmount >= goal.targetAmount ? 'completed' : 'active';
    
    return await goal.update({
      currentAmount: newAmount,
      status
    });
  }
}

module.exports = new SavingGoalRepository();
