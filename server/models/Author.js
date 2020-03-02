const Sequelize = require('sequelize');
const db = require('../config/database');

const Author = db.define(
  'Author',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    'First Name': {
      type: Sequelize.TEXT
    },
    'Last Name': {
      type: Sequelize.TEXT
    }
  },
  { timestamps: false }
);

module.exports = Author;
