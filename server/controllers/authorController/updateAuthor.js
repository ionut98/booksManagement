const Author = require('../../models/Author');

/** body payload =>
 * {  "id": ""
 *    "FirstName": "",
 *    "LastName": ""
 * }
 * if one of the params is "" (empty string) then it will be replaced with the present value
 */
module.exports = (req, res) => {
  const {
    body: { id, FirstName: newFirstName, LastName: newLastName }
  } = req;

  Author.findAll({
    where: {
      id: id
    }
  })
    .then(author => {
      Author.update(
        {
          FirstName: newFirstName ? newFirstName : author.FirstName,
          LastName: newLastName ? newLastName : author.LastName
        },
        {
          where: {
            id: id
          }
        }
      )
        .then(result => {
          res.send({
            success: true,
            updated: Boolean(result[0])
          });
          console.log(`--------------------------------------------`);
        })
        .catch(err => {
          console.log(err, 'at updating');
          res.send({
            success: false
          });
          console.log(`--------------------------------------------`);
        });
    })
    .catch(err => {
      console.log(err, 'at finding the element at update');
      res.send({
        success: false
      });
      console.log(`--------------------------------------------`);
    });
};
