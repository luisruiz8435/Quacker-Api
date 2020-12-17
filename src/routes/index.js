const handleIndex = (req, res, database) => {
  //Get logged in user id
  database('users').where({
    username: req.body.username
  }).select('user_id')
  .then(userID => {
    userID = userID[0].user_id

    //Use logged in user id to get all followee's id's
    database('followers').where({
      follower_id:  userID
    }).select('user_id')
    .then(userIDs => {
      let arr = []
      for (let i = 0; i < userIDs.length; i++) {
        let obj = userIDs[i];
        arr.push(obj.user_id);
      }

      //Use the followee's id's to get their usernames
      database.select('username').from('users')
      .whereIn('user_id', arr)
      .then(followingUsers => {
        let arr = [];
        arr.push(req.body.username)
        for (let i = 0; i < followingUsers.length; i++) {
          let obj = followingUsers[i];
          arr.push(obj.username)
        }

        database.select('*').from('posts')
        .whereIn('username', arr)
        .orderBy('date_posted', 'desc')
        .then(followingPosts => {
          res.status(200).json(followingPosts)
        })
      })
    })
  })
  .catch(err => console.log(err))
}

module.exports = {handleIndex: handleIndex};
