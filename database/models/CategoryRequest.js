'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryRequest extends Model {
    static associate(models) {
      CategoryRequest.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  CategoryRequest.init(
    {
      title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
      reason: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
      status: { 
        type: DataTypes.ENUM('pending', 'approved', 'rejected'), 
        defaultValue: 'pending' 
    },
      userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
    },
    {
      sequelize,
      modelName: 'CategoryRequest',
      tableName: 'CategoryRequests'
    }
  );
  return CategoryRequest;
};
