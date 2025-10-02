const bcrypt = require("bcrypt");
const UserRepository = require("../Repositories/UserRepository");

class UserService {
  async listUsers() {
    return await UserRepository.findAll();
  }
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
    try {
      const user = await UserRepository.findByEmail(email);
      if (!user) {
        console.log("User not found:", email);
        return null;
      }

      const isValid = await user.validPassword(password);
      if (!isValid) {
        console.log("Invalid password for user:", email);
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        role: user.role.name,
      };
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }
}

module.exports = new UserService();
