const router = require('express').Router();

// here are defined all the corresponding routes for /books

/**
 * returning all the existing books in the db
 */
router.get('/', require('../controllers/bookController/getAllBooks'));
/**
 * add a book in the db
 */
router.post('/add', require('../controllers/bookController/addBook'));
/**
 * update an existing book in the db
 */
router.put('/update', require('../controllers/bookController/updateBook'));
/**
 * delete a book from the db
 */
router.delete('/delete', require('../controllers/bookController/deleteBook'));
/**
 * filter the books from the db by title
 */
router.get(
  '/filter-by-title',
  require('../controllers/bookController/filterBooks')
);

module.exports = router;
