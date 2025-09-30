const bcrypt = require("bcrypt");
const UserRepository = require("../Repositories/UserRepository");

class UserService {
  async registerUser({ fName, lName, email, password }) {
    const role = await UserRepository.findRoleByName("User");
    if (!role) throw new Error("Role 'User' non trouvé");

    return await UserRepository.createUser({
      fName,
      lName,
      email,
      password,
      roleId: role.id,
    });
  }

  async authenticate(email, password) {
    const user = await UserRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await user.validPassword(password);
    if (!isValid) return null;

    return {
      id: user.id,
      email: user.email,
      role: user.role.name,
    };
  }
}

module.exports = new UserService();
