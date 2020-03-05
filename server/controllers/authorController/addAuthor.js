const Author = require('../../models/Author');

/**
 * body payload =>
 * {
 *    "FirstName": "",
 *    "LastName": ""
 * }
 */
module.exports = (req, res) => {
  const { body } = req;
  Author.create(body)
    .then(() => {
      res.send({
        success: true
      });
      console.log(`--------------------------------------------`);
    })
    .catch(err => {
      console.log(err);
      res.send({
        success: false
      });
      console.log(`--------------------------------------------`);
    });
};
