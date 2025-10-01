'use strict';
const { Model, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
      User.hasMany(models.Wallet, { foreignKey: 'userId' });
    }

    async validPassword(password) {
      return await bcrypt.compare(password, this.password);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      fName: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      lName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      hooks: {
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        }
      }
    }
  );
  return User;
};
