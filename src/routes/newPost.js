const createPost = (req, res, database) => {
  const {username, message} = req.body;

  database('posts')
  .insert({
    post_message: message,
    date_posted: new Date(),
    username: username
  })
  .then(respone => {
    database('posts').orderBy('date_posted', 'desc')
    .then(posts => {
      res.status(200).json(posts)
    })
  })
  .catch(err => console.log(err))
};

module.exports = {createPost: createPost}