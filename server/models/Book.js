const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Book = db.define(
  'Book',
  {
    ISBN: {
      type: Sequelize.TEXT,
      primaryKey: true,
      allowNull: false
    },
    Name: {
      type: Sequelize.TEXT
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
