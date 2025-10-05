'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SavingGoal extends Model {
    static associate(models) {
      SavingGoal.belongsTo(models.User, { foreignKey: 'userId' });
      SavingGoal.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  
  SavingGoal.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      targetAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      currentAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: true
      },
      priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'medium'
      },
      status: {
        type: DataTypes.ENUM('active', 'completed', 'paused'),
        allowNull: false,
        defaultValue: 'active'
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
      modelName: 'SavingGoal',
      tableName: 'SavingGoals'
    }
  );
  
  return SavingGoal;
};
