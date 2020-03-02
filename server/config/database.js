const Sequelize = require('sequelize');
const db = new Sequelize('sqlite:../library.db', {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

//test connection
// db.authenticate()
//   .then(() => console.log('database connected...'))
//   .catch(err => console.log('Error: ' + err));

module.exports = db;
