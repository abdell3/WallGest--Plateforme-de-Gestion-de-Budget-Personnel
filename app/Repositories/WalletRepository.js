const { Wallet, Transaction, Category } = require("../../database/models");

class WalletRepository {
  async findByUser(userId) {
    return await Wallet.findAll({ 
      where: { 
        userId 
      }, 
      include: [{ model: Category }] 
    });
  }
  async findById(id) {
    return await Wallet.findByPk(id, { 
      include: [Category, Transaction] 
    });
  }
  async create(data) { 
    return await Wallet.create(data); 
  }
  async update(id, data) { 
    const item = await Wallet.findByPk(id); 
    if (!item) {
      return null; 
    }
    return await item.update(data); 
  }
  async delete(id) { 
    return await Wallet.destroy({ 
      where: { id } 
    }); 
  }
}

module.exports = new WalletRepository();

