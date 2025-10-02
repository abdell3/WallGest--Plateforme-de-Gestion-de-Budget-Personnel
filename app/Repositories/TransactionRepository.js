const { Transaction, Wallet } = require("../../database/models");

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
}

module.exports = new TransactionRepository();

