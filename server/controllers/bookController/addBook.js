const Book = require('../../models/Book');
const Books_Authors = require('../../models/Books_Authors');

/**
 * body payload =>
 * {
 *    "book": {
 *            "ISBN",
 *            "Title",
 *            "NrOfPages",
 *            "Type",
 *            "Description"
 *          },
 *    "authors": [idAuthor1, idAuthor2, ...]
 * }
 */
module.exports = (req, res) => {
  const {
    body: { book, authors }
  } = req;
  Book.create(book)
    .then(() => {
      Books_Authors.bulkCreate(
        authors.map(authorId => ({
          BookISBN: book.ISBN,
          AuthorId: authorId
        }))
      )
        .then(() => {
          res.send({
            success: true
          });
          console.log(`--------------------------------------------`);
        })
        .catch(err => {
          console.log(err, 'at adding book');
          res.send({
            success: false
          });
          console.log(`--------------------------------------------`);
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
