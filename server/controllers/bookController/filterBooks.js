const Author = require('../../models/Author');
const Book = require('../../models/Book');
const { Sequelize } = require('../../config/database');

module.exports = (req, res) => {
  const {
    query: { keyword }
  } = req;
  const Op = Sequelize.Op;
  Book.findAll({
    include: Author,
    where: {
      Title: {
        [Op.substring]: keyword
      }
    }
  })
    .then(result => {
      let books = result.map(bookAuthor => bookAuthor.dataValues);
      console.log(books);
      console.log(`--------------------------------------------`);
      res.send({
        success: true,
        books: result
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        success: false
      });
      console.log(`--------------------------------------------`);
    });
};
