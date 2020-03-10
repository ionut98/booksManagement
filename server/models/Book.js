const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Book = db.define(
  'Book',
  {
    ISBN: {
      type: Sequelize.TEXT,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    Name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    NrOfPages: {
      type: Sequelize.NUMBER
    },
    Type: {
      type: Sequelize.TEXT
    },
    Description: {
      type: Sequelize.TEXT
    }
  },
  { timestamps: false }
);

module.exports = Book;
