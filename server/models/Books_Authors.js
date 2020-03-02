const Sequelize = require('sequelize');
const db = require('../config/database');

const Books_Authors = db.define(
  'Books_Authors',
  {
    Book_ISBN: {
      type: Sequelize.NUMBER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id'
      }
    },
    AuthorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Author,
        key: 'id'
      }
    }
  },
  { timestamps: false }
);

module.exports = Books_Authors;
