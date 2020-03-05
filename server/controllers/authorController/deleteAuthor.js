const Author = require('../../models/Author');

/** body payload =>
 * {
 *    "id": ""
 * }
 */
module.exports = (req, res) => {
  const {
    body: { id }
  } = req;

  Author.destroy({
    where: {
      id: id
    }
  })
    .then(result => {
      res.send({
        success: true,
        deleted: Boolean(result)
      });
      console.log(`--------------------------------------------`);
    })
    .catch(err => {
      console.log(err, 'at deleting');
      res.send({
        success: false
      });
      console.log(`--------------------------------------------`);
    });
};
