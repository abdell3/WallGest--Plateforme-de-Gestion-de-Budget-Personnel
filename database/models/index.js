'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { sequelize, Sequelize } = require('../../config/database');
const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js';
  })
  .forEach(file => {
    const modelFactory = require(path.join(__dirname, file));
    const model = modelFactory(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
