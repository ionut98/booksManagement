const Author = require('../../models/Author');
const Book = require('../../models/Book');

module.exports = (req, res) => {
  Book.findAll({
    include: Author
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
