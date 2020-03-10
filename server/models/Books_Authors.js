const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Book = require('./Book');
const Author = require('./Author');

const Books_Authors = db.define(
  'Books_Authors',
  {
    BookISBN: {
      type: Sequelize.NUMBER,
      allowNull: false,
      references: {
        model: Book,
        key: 'ISBN'
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

Author.belongsToMany(Book, { through: 'Books_Authors' });
Book.belongsToMany(Author, { through: 'Books_Authors' });

module.exports = Books_Authors;
