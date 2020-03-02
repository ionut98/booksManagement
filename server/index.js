const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 30401;

const app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

/**
 * returning all the existing books in the db
 */
app.get('/all-books', async (req, res) => {
  res.send({
    books: ''
  });
});

/**
 * returning all the existing authors in the db
 */
app.get('/all-authors', async (req, res) => {
  res.send({
    authors: ''
  });
});

app.listen(port, () =>
  console.log(`Library server is listening on port ${port}!`)
);
