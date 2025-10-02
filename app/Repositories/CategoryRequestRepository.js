const { CategoryRequest, User } = require("../../database/models");

class CategoryRequestRepository {

  async findAll() {
    return await CategoryRequest.findAll({ include: [User], order: [['createdAt', 'DESC']] });
  }

  async findByUser(userId) {
    return await CategoryRequest.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
  }

  async findById(id) {
    return await CategoryRequest.findByPk(id, { include: [User] });
  }

  async create(data) {
    return await CategoryRequest.create(data);
  }

  async update(id, data) {
    const item = await CategoryRequest.findByPk(id);
    if (!item) return null;
    return await item.update(data);
  }
  
  async delete(id) {
    return await CategoryRequest.destroy({ where: { id } });
  }
}

module.exports = new CategoryRequestRepository();
