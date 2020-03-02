const router = require('express').Router();
const db = require('../config/database');
const Authors = require('../models/Author');

/**
 * returning all the existing authors in the db
 */
router.get('/', (req, res) => {
  Authors.findAll()
    .then(authors => {
      console.log(authors);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
});
/**
 * add a author in the db
 */
router.post('/add', (req, res) => {
  res.send('NOT IMPLEMENTED');
});
/**
 * update an existing author in the db
 */
router.put('/update', (req, res) => {
  res.send('NOT IMPLEMENTED');
});
/**
 * delete a author from the db
 */
router.delete('/delete', (req, res) => {
  res.send('NOT IMPLEMENTED');
});
/**
 * filter the authors from the db by name
 */
router.get('/filter-by-name', (req, res) => {
  res.send('NOT IMPLEMENTED');
});

module.exports = router;
