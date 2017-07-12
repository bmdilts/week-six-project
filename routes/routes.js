const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const validator = require('express-validator');
const models = require('../models');
const sequelize = require('sequelize')
const bluebird = require('bluebird')
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/public', express.static('public'));
app.use(validator());


router.get('/', function(req, res) {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    const displayNameP = models.users.findOne({where: {id: req.session.userId}})
    .then(function(user){
      return user.dataValues.displayName;
    });

    const gabsP = models.msgs.findAll({include: [models.users], raw: true})
      .then(data => {
        const gabs = [];
        for(let i = 0; i < data.length; i++){
          gabs.push({
            name: data[i]['user.displayName'],
            gab: data[i].gab,
            date: data[i].createdAt
          });
        }
        return gabs;
    });

    const likesP = models.msgs.findAll({include: [models.likes], raw: true})
      .then(data => {
        const likes = [];
        for(let i = 0; i < data.length; i++){
          // likes.push(data[i][likes.userId].length);
          likes.push(0);
        }
        return likes;
      });

    Promise.all([displayNameP, gabsP, likesP])
      .then(function(results){
        const displayName = results[0];
        const gabs = results[1];
        const likes = results[2];
        for(let i=0; i<gabs.length; i++){
          gabs[i].likes = likes[i];
        }
        res.render('home', {displayName: displayName, gabs: gabs});
      });
    // res.send('done');
  }
});

router.get('/login', function(req, res) {
  res.render('login');
});
router.get('/logout', function(req, res){
  req.session.userId = null;
  res.redirect('/login');
});
router.get('/signup', function(req, res) {
  res.render('signup');
});
router.get('/new', function(req, res) {
  res.render('new');
});
// router.get('/likes/:gabId', function(req, res){
//   var gabId = req.
//   var likes = models.likes.findAll({where:{
//
//   }})
//   res.render('likes', {likes: likes})
// });


router.post('/like', function (req, res) {
  
  res.redirect('/');
});

router.post('/msg', function(req, res) {
  models.msgs.create({
    gab: req.body.new_gab,
    userId: req.session.userId,
  });
  res.redirect('/');
});

router.post('/signup', function(req, res) {
  if (req.body.password != req.body.confirm) {
    console.log('Passwords do not match!');
  } else {
    models.users.create({
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
      });
    res.redirect('/login');
  }
});

router.post('/login', function(req, res) {
  models.users.findOne({where: req.body})
  .then(function(user){
    if(user){
      req.session.userId = user.id;
      res.redirect('/');
    }else{
      res.redirect('/login');
    }
  });
});



module.exports = router;
