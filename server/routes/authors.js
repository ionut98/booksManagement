const router = require('express').Router();
const Author = require('../models/Author');

// here are defined all the corresponding routes for /authors

/**
 * returning all the existing authors in the db
 */
router.get('/', (req, res) => {
  Author.findAll()
    .then(authors => {
      console.log(authors);
      console.log(`--------------------------------------------`);
      res.send({
        authors: authors
      });
    })
    .catch(err => console.log(err));
});

/**
 * add a author in the db
 * body payload =>
 * {
 *    "First Name": "",
 *    "Last Name": ""
 * }
 */
router.post('/add', (req, res) => {
  const { body } = req;
  Author.create(body).then(() => {
    res.send({
      added: true
    });
    console.log(`--------------------------------------------`);
  });
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
