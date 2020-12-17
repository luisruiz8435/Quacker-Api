const users = (req, res, database) => {
  database('users').whereNot({
    username:  req.body.username
  }).select('*')
  .then(users => res.status(200).json(users))
  .catch(err => console.log(err))
}

module.exports = {users: users};