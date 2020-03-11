const Book = require('../../models/Book');
const Books_Authors = require('../../models/Books_Authors');

/** body payload =>
 * {
 *    "ISBN"
 * }
 */

const deleteBook = ISBN => {
  return new Promise(resolve => {
    Book.destroy({
      where: {
        ISBN: ISBN
      }
    })
      .then(() => {
        resolve(true);
      })
      .catch(err => {
        console.log(err, 'at deleting book');
        console.log(`--------------------------------------------`);
        resolve(false);
      });
  });
};

const deleteBooksAuthors = ISBN => {
  return new Promise(resolve => {
    Books_Authors.destroy({
      where: {
        BookISBN: ISBN
      }
    })
      .then(() => {
        resolve(true);
      })
      .catch(err => {
        console.log(err, 'at deleting BooksAuthors records');
        console.log(`--------------------------------------------`);
        resolve(false);
      });
  });
};

module.exports = async (req, res) => {
  const {
    body: { ISBN }
  } = req;

  let deletedBook = await deleteBook(ISBN);
  let deletedBooksAuthors = await deleteBooksAuthors(ISBN);

  res.send({
    success: true,
    deletedBook: deletedBook,
    deletedBooksAuthors: deletedBooksAuthors
  });
};
