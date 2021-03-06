const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');

const database = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});

//Middleware
app.use(bodyParser.json())
app.use(cors())

//List of routers
const index = require('./routes/index')
const usersModule = require('./routes/usersData')
const myPostsModule = require('./routes/myPosts')
const visitingPostsModule = require('./routes/visitingPosts')
const isFollowingTestModule = require('./routes/isFollowingTest')
const followUpdaterModule = require('./routes/followUpdater')
const handleSignInModule = require('./routes/handleSignIn')
const handleRegisterModule = require('./routes/handleRegister')
const createPostModule = require('./routes/newPost')
const followerDataModule = require('./routes/followerData')

//Salt for bycrypt
const saltRounds = 10;

app.get('/', (req, res) => {res.send('it is working :) ')})
app.post('/', (req, res) => {index.handleIndex(req, res, database)});
app.post('/users', (req, res) => {usersModule.users(req, res, database)});
app.post('/myposts', (req, res) => {myPostsModule.getMyPosts(req, res, database)})
app.post('/visitingposts', (req, res) => {visitingPostsModule.getVisitingPosts(req, res, database)})
app.post(('/isfollowing'), (req, res) => {isFollowingTestModule.isFollowingTester(req, res, database)})
app.post('/followupdate', (req, res) => {followUpdaterModule.followUpdater(req, res, database)})
app.post('/signin', (req, res) => {handleSignInModule.handleSignIn(req, res, database, bcrypt)})
app.post('/register', (req, res) => {handleRegisterModule.handleRegister(req, res, database, bcrypt, saltRounds)})
app.post('/post', (req, res) => {createPostModule.createPost(req, res, database)})
app.post('/getmyfollowerdata', (req, res) => {followerDataModule.getMyFollowerData(req, res, database)})

const port = process.env.PORT
app.listen(port || 3000, () => {
  console.log(`Server now running on port ${port}`)
});
