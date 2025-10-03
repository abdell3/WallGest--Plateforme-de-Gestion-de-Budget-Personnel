const { Category } = require("../../database/models");
const { Op } = require("sequelize");

class CategoryRepository {
  async findAll() { 
    return await Category.findAll(); 
  }
  async findById(id) { 
    return await Category.findByPk(id); 
  }
  async create(data) { 
    return await Category.create(data); 
  }
  async update(id, data) { 
    const item = await Category.findByPk(id); 
    if (!item)  {
      return null; 
    }
    return await item.update(data); 
  }
  async delete(id) { 
    return await Category.destroy({ where: { id } }); 
  }

  async countSince(date) {
    return await Category.count({
      where: {
        createdAt: {
          [Op.gte]: date
        }
      }
    });
  }
}

module.exports = new CategoryRepository();

