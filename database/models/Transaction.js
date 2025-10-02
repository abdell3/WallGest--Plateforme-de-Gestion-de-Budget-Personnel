'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Wallet, { foreignKey: 'walletId' });
    }
  }

  
  Transaction.init(
    {
      reference: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deposit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      withdraw: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      walletId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'Transactions'
    }
  );
  return Transaction;
};

