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
    .catch(err => {
      console.log(err);
      res.send({
        found: false
      });
      console.log(`--------------------------------------------`);
    });
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
  Author.create(body)
    .then(() => {
      res.send({
        added: true
      });
      console.log(`--------------------------------------------`);
    })
    .catch(err => {
      console.log(err);
      res.send({
        added: false
      });
      console.log(`--------------------------------------------`);
    });
});

/**
 * update an existing author in the db
 * body payload =>
 * {  "id": ""
 *    "First Name": "",
 *    "Last Name": ""
 * }
 * if one of the params is "" (empty string) then it will be replaced with the present value
 */
router.put('/update', (req, res) => {
  const { body } = req;

  const id = body.id;
  const newFirstName = body['First Name'];
  const newLastName = body['Last Name'];

  Author.findAll({
    where: {
      id: id
    }
  })
    .then(author => {
      Author.update(
        {
          'First Name': newFirstName ? newFirstName : author['First Name'],
          'Last Name': newLastName ? newLastName : author['Last Name']
        },
        {
          where: {
            id: id
          }
        }
      )
        .then(() => {
          res.send({
            updated: true
          });
          console.log(`--------------------------------------------`);
        })
        .catch(err => {
          console.log(err, 'at updating');
          res.send({
            updated: false
          });
          console.log(`--------------------------------------------`);
        });
    })
    .catch(err => {
      console.log(err, 'at finding the element at update');
      res.send({
        updated: false
      });
      console.log(`--------------------------------------------`);
    });
});

/**
 * delete a author from the db
 */
router.delete('/delete', (req, res) => {
  const {
    body: { id }
  } = req;

  Author.destroy({
    where: {
      id: id
    }
  }).then(()=>{
  res.send({
    updated: true
  });
  console.log(`--------------------------------------------`);
})
.catch(err => {
  console.log(err, 'at updating');
  res.send({
    updated: false
  });
  console.log(`--------------------------------------------`);
}););
});

/**
 * filter the authors from the db by name
 */
router.get('/filter-by-name', (req, res) => {
  res.send('NOT IMPLEMENTED');
});

module.exports = router;
