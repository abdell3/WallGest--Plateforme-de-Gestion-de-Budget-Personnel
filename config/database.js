const { Sequelize } = require('sequelize');
require('dotenv').config();

const DB_NAME = process.env.DB_NAME || 'wallgest';
const DB_USER = process.env.DB_USER || 'user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'wallgestPass';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3311;
const DB_DIALECT = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
  define: {
    underscored: false,
    timestamps: true
  },
  dialectOptions: {
    timezone: 'Z'
  }
});

module.exports = { sequelize, Sequelize };
