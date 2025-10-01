'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    static associate(models) {
      Wallet.belongsTo(models.User, { foreignKey: 'userId' });
      Wallet.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Wallet.hasMany(models.Transaction, { foreignKey: 'walletId' });
    }
  }
  Wallet.init(
    {
      amountG: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      totalDepo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      totalWithdraw: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Wallet',
      tableName: 'Wallets'
    }
  );
  return Wallet;
};

