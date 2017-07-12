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

var loggedin = true

router.get('/', function(req, res) {
  if (!req.session.userId) {
    res.redirect('/login');
  } else {
    const displayName = models.users.findOne({where: {id: req.session.userId}}).then(function(user){
      return user.displayName;
    });
    models.msgs.findAll({include: [models.users]})
      .then(tasks => {
        console.log(JSON.stringify(tasks));
        for(let i = 0; i < tasks.length; i++){
          let name = tasks.user.displayName;
          let gab = tasks.gab;
          let date = tasks.date;
          // return [name, gab, date];
        }
      // function(msgs){
      //   console.log(msgs);
      //   for(let i = 0; i < msgs.length; i++){
      //     var user = models.users.findOne({where: {id: msgs[i].userId}})
      //     .then(function(user){
      //       return user;
      //     });
      //     console.log(user);
      //     var name = user.displayName;
      //     console.log(name);
      //     return name;
      //     }
      //   }
    });
    models.msgs.findAll({include: [models.likes]})
      .then(tasks => {
        console.log(JSON.stringify(tasks));
        for(let i = 0; i < tasks.length; i++){
          let likes = tasks.userId.length;
          return likes;
        }
      });

    res.render('home', {gabs: {displayName: displayName, name: name, gab: gab, date: date, likes: likes}});
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
