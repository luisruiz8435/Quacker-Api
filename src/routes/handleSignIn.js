const handleSignIn = (req, res, database, bcrypt) => {
  //Has to return a username and the posts data to load on the home page.
  const {email, password} = req.body;

  //fetching from database
  database('login').where('email', email)
  .then(data => {
    bcrypt.compare(password, data[0].hash, function(err, result) {
      // result == true
      if (result === true) {
        database('users').where('email', email)
        .then(data => res.status(200).json(data[0]))
      }
      // Return wrong credentials
      else {
        res.status(400).json('Wrong Credentials');
      }
    });
  })
  .catch(err => res.status(400).json('Wrong Credentials'))
};

module.exports = {handleSignIn: handleSignIn};