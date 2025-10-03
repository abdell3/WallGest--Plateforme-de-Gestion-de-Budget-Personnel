const { Transaction, Wallet } = require("../../database/models");
const { Op } = require("sequelize");

class TransactionRepository {
  async findAll() {
    return await Transaction.findAll({ 
      include: [{ model: Wallet, include: ['Category', 'User'] }], 
      order: [['createdAt', 'DESC']] 
    });
  }

  async findByWallet(walletId) { 
    return await Transaction.findAll({ 
      where: { 
        walletId 
      }, 
      order: [['createdAt', 'DESC']] 
    }); 
  }

  async findById(id) {
    return await Transaction.findByPk(id);
  }

  async create(data) { 
    return await Transaction.create(data); 
  }

  async update(id, data) { 
    const item = await Transaction.findByPk(id); 
    if (!item) {
      return null; 
    }
    return await item.update(data); 
  }

  async delete(id) { 
    return await Transaction.destroy({ 
      where: { id } 
    }); 
  }

  async count() {
    return await Transaction.count();
  }

  async getTotalDeposits() {
    const result = await Transaction.sum('deposit');
    return result || 0;
  }

  async getTotalWithdrawals() {
    const result = await Transaction.sum('withdraw');
    return result || 0;
  }

  async countSince(date) {
    return await Transaction.count({
      where: {
        createdAt: {
          [Op.gte]: date
        }
      }
    });
  }
}

module.exports = new TransactionRepository();

