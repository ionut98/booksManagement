const router = require('express').Router();
const Book = require('../models/Book');

// here are defined all the corresponding routes for /books

/**
 * returning all the existing books in the db
 */
router.get('/', (req, res) => {
  Book.findAll()
    .then(books => {
      console.log(books.map(book => book.dataValues));
      console.log(`--------------------------------------------`);
      res.send({
        books: books
      });
    })
    .catch(err => console.log(err));
});
/**
 * add a book in the db
 */
router.post('/add', (req, res) => {
  res.send('NOT IMPLEMENTED');
});
/**
 * update an existing book in the db
 */
router.put('/update', (req, res) => {
  res.send('NOT IMPLEMENTED');
});
/**
 * delete a book from the db
 */
router.delete('/delete', (req, res) => {
  res.send('NOT IMPLEMENTED');
});
/**
 * filter the books from the db by title
 */
router.get('/filter-by-title', (req, res) => {
  res.send('NOT IMPLEMENTED');
});

module.exports = router;
