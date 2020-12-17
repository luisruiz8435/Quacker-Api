const getMyFollowerData = (req, res, database) => {
  database('users').where({
    username: req.body.username
  }).select('user_id')
  .then(user => {

    database('followers').where({
      follower_id: user[0].user_id
    }).select('user_id')
    .then(followingIDs => {

      let arrFollowingIDs = []
      followingIDs.map(obj => arrFollowingIDs.push(obj.user_id))
      database.select('username').from('users')
      .whereIn('user_id', arrFollowingIDs)
      .then(followingUsers => {

        database('followers').where({
          user_id: user[0].user_id
        }).select('follower_id')
        .then(followerIDs => {

          let arrFollowerIDs = []
          followerIDs.map(obj => arrFollowerIDs.push(obj.follower_id))
          database.select('username').from('users')
          .whereIn('user_id', arrFollowerIDs)
          .then(followers => {
            const followDataObj = {
              following: followingUsers,
              followers: followers
            };

            res.status(200).json(followDataObj)
          })
        })
      })
    })
  })
};

module.exports = {getMyFollowerData: getMyFollowerData}