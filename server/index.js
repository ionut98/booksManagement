const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Author = require('./models/Author');
const Book = require('./models/Book');
const Books_Authors = require('./models/Books_Authors');

const port = 30401;

const app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

/**
 * if the tables are not created in the db => then create
 * if it's necessary to update the tables schemas (the tables are already created) uncomment the {force: true} and use it inside the parantheses ()
 */
Author
  .sync
  // {force: true}
  ()
  .then(
    Book
      .sync
      // {force: true}
      ()
      .then(
        Books_Authors
          .sync
          // {force: true}
          ()
          .then(() => {
            console.log('Tables created if not existed!');
            console.log(`--------------------------------------------`);
          })
      )
  );

/**
 * to access these routes - the url is /books/... or /authors/...
 */
app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));

app.listen(port, () => {
  console.log(`--------------------------------------------`);
  console.log(`Library server is listening on port ${port}!`);
  console.log(`--------------------------------------------`);
  console.log(`Tables creation checking...`);
  console.log(`--------------------------------------------`);
});
