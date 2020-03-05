const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Book = require('./Book');
const Author = require('./Author');

const Books_Authors = db.define(
  'Books_Authors',
  {
    Book_ISBN: {
      type: Sequelize.NUMBER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id'
      },
      primaryKey: true
    },
    AuthorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Author,
        key: 'id'
      },
      primaryKey: true
    }
  },
  { timestamps: false }
);

module.exports = Books_Authors;
