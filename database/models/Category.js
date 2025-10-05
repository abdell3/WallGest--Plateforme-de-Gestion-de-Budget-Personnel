'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Wallet, { foreignKey: 'categoryId' });
      Category.hasMany(models.SavingGoal, { foreignKey: 'categoryId' });
    }
  }
  Category.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      budget: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'Categories'
    }
  );
  return Category;
};

