const Sequelize = require('sequelize');
const db = require('../config/database');

const Author = db.define(
  'Author',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false
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

Author.sync().then(() => console.log('done'));

module.exports = Author;
