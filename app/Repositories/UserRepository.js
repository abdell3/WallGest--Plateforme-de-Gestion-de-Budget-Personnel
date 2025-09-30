const { User, Role } = require("../../database/models");

class UserRepository {
  async createUser(data) {
    return await User.create(data);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email }, include: "role" });
  }

  async findRoleByName(name) {
    return await Role.findOne({ where: { name } });
  }
}

module.exports = new UserRepository();
