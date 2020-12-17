const isFollowingTester = (req, res, database) => {

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
          if (data.length === 0) {
            res.status(200).json(false);
          }
          else {
            res.status(200).json(true);
          }
        }
      )
      .catch(err => console.log(err))
    })
  })
};

module.exports = {isFollowingTester: isFollowingTester}