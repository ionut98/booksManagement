const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Author = require('./models/Author');
const Book = require('./models/Author');
const Books_Authors = require('./models/Author');

const port = 30401;

const app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

Author.sync().then(
  Book.sync().then(Books_Authors.sync().then(() => console.log('Done last!')))
);

app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));

app.listen(port, () =>
  console.log(`Library server is listening on port ${port}!`)
);
