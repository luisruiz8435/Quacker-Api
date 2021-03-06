const handleRegister = (req, res, database, bcrypt, saltRounds) => {
  //Has to return the route. Has to add the user to the users table
  const {email, username, password} = req.body;

  database('users')
  .insert({
    email: email,
    username: username,
    date_joined: new Date()
  })
  .then(user => {
  })
  .then(() => {
    bcrypt.hash(password, saltRounds).then(function(hash) {
      // Store hash in your password DB.
      database('login')
      .insert({
        hash: hash,
        email: email,
      })
      .then(() => res.json({username: username}))
      .catch(err => {
        console.log(err)
      })
    });
  })
  .catch(err => {
    console.log("err: ", err)
    if (err.detail === `Key (username)=(${username}) already exists.`) {
      res.status(400).json('Username Taken!');
    }
    else {
      res.status(400).json('Unable to Register');
    }
  })
};

module.exports = {handleRegister: handleRegister}