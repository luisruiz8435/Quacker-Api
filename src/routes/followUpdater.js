const followUpdater = (req, res, database) => {
  database('users').where({
    username: req.body.username,
  }).select('user_id').then(
    data => {
      let follower;
      follower = data[0].user_id
      return follower;
    }
  )
  .then(follower => {
    database('users').where({
      username: req.body.visitingWho,
    }).select('user_id').then(
      data => {
        let followee;
        followee = data[0].user_id
        return {follower: follower, followee: followee}
      }
    )
    .then(obj => {
      database('followers').where({
        user_id: obj.followee,
        follower_id: obj.follower
      }).select('id').then(
        data => {
          const {follower, followee} = obj;
          //For when the follow doesnt exist
          if (data.length === 0) {
            database('followers').insert({user_id: followee, follower_id: follower})
            .then(() => {
              res.status(200).json(true)
            })
          }
          //For when the follow does exist
          else {
            database('followers')
            .where({user_id: followee, follower_id: follower})
            .del()
            .then(() => {
              res.status(200).json(false)
            })
          }
        }
      )
      .catch(err => console.log(err))
    })
  })
};

module.exports = {followUpdater: followUpdater}