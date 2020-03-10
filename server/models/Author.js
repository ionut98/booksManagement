const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Author = db.define(
  'Author',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    FirstName: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    LastName: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  },
  { timestamps: false }
);

module.exports = Author;
