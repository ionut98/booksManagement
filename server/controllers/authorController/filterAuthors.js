const Author = require('../../models/Author');
const { Sequelize } = require('../../config/database');

/**
 * query params => keyword = ""
 * it's case sensitive
 */

module.exports = (req, res) => {
  const {
    query: { keyword }
  } = req;
  const Op = Sequelize.Op;
  Author.findAll({
    where: {
      [Op.or]: [
        {
          LastName: {
            [Op.substring]: keyword
          }
        },
        {
          FirstName: {
            [Op.substring]: keyword
          }
        }
      ]
    }
  })
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
