const Author = require('../../models/Author');

module.exports = (req, res) => {
  Author.findAll()
    .then(authors => {
      console.log(authors.map(author => author.dataValues));
      console.log(`--------------------------------------------`);
      res.send({
        success: true,
        authors: authors
      });
    })
    .catch(err => {
      console.log(err);
      res.send({
        success: false
      });
      console.log(`--------------------------------------------`);
    });
};
