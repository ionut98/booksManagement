const Book = require('../../models/Book');
const Books_Authors = require('../../models/Books_Authors');

/**
 * body payload =>
 * {
 *  - "ISBN", -> obligatoriu
 *  - daca exista 'book', se modifica parametrii existenti in cadrul obiectului
 *     --"book": {
 *          "Title",
 *          "NrOfPages",
 *          "Type",
 *          "Description"
 *        },
 *  - daca exista 'authors', se modifica cu noua lista de id-uri
 *      --"authors": [idAuthor1, idAuthor2, ...]
 * }
 */

const updateBook = (ISBN, book) => {
  return new Promise(resolve => {
    // check if there are any changes in book's parameters
    if (book) {
      Book.update(book, {
        where: {
          ISBN: ISBN
        }
      })
        .then(result => {
          resolve(Boolean(result[0]));
        })
        .catch(err => {
          console.log(err, 'at updating book');
          console.log(`--------------------------------------------`);
          resolve(false);
        });
    } else {
      resolve(false);
    }
  });
};

const updateBooksAuthors = (ISBN, authors) => {
  return new Promise(resolve => {
    // check if there are any changes in authors list
    if (authors && authors.length) {
      Books_Authors.destroy({
        where: {
          BookISBN: ISBN
        }
      })
        .then(() => {
          Books_Authors.bulkCreate(
            authors.map(authorId => ({
              BookISBN: ISBN,
              AuthorId: authorId
            }))
          )
            .then(() => {
              resolve(true);
            })
            .catch(err => {
              console.log(
                err,
                `at adding the new BooksAuthors records at updating book's authors`
              );
              console.log(`--------------------------------------------`);
              resolve(false);
            });
        })
        .catch(err => {
          console.log(
            err,
            `at deleting existing BooksAuthors records at updating book's authors`
          );
          console.log(`--------------------------------------------`);
          resolve(false);
        });
    } else {
      resolve(false);
    }
  });
};

module.exports = async (req, res) => {
  const {
    body: { ISBN, book, authors }
  } = req;

  let updatedBook = await updateBook(ISBN, book);
  let updatedBooksAuthors = await updateBooksAuthors(ISBN, authors);

  res.send({
    success: true,
    updatedBook: updatedBook,
    updatedBooksAuthors: updatedBooksAuthors
  });
};
