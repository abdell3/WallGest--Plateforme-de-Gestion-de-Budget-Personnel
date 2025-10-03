const { User, Role } = require("../../database/models");
const { Op } = require("sequelize");

class UserRepository {
  async findAll() {
    return await User.findAll({ include: "role" });
  }
  async createUser(data) {
    return await User.create(data);
  }

  async findByEmail(email) {
    return await User.findOne({ 
      where: { 
        email 
      }, 
      include: "role" 
    });
  }

  async findRoleByName(name) {
    return await Role.findOne({ 
      where: { 
        name 
      } 
    });
  }

  async count() {
    return await User.count();
  }

  async countSince(date) {
    return await User.count({
      where: {
        createdAt: {
          [Op.gte]: date
        }
      }
    });
  }
}

module.exports = new UserRepository();
