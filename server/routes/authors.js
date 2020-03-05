const router = require('express').Router();
const Author = require('../models/Author');
const { Sequelize } = require('../config/database');

//routes for /authors

/**
 * returning all the existing authors in the db
 */
router.get('/', require('../controllers/authorController/getAllAuthors'));

/**
 * add a author in the db
 */
router.post('/add', require('../controllers/authorController/addAuthor'));

/**
 * update an existing author in the db
 *
 */
router.put('/update', require('../controllers/authorController/updateAuthor'));

/**
 * delete a author from the db
 */
router.delete(
  '/delete',
  require('../controllers/authorController/deleteAuthor')
);

/**
 * filter the authors from the db by name
 */
router.get(
  '/filter-by-name',
  require('../controllers/authorController/filterAuthors')
);

module.exports = router;
