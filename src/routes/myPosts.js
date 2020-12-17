const getMyPosts = (req, res, database) => {
  database('posts').where({
    username: req.body.username
  }).orderBy('date_posted', 'desc')
  .then(posts => res.status(200).json(posts))
  .catch(err => {
    console.log(err);
    res.status(400).json('Something Went Wrong')
  })
};

module.exports = {getMyPosts: getMyPosts}