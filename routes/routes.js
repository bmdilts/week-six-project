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
    const displayNameP = models.users.findOne({
        where: {
          id: req.session.userId
        }
      })
      .then(function(user) {
        return user.dataValues.displayName;
      });

    const gabsP = models.msgs.findAll({
        include: [models.users],
        raw: true
      })
      .then(data => {
        const gabs = [];
        for (let i = 0; i < data.length; i++) {
          gabs.push({
            id: data[i].id,
            name: data[i]['user.displayName'],
            gab: data[i].gab,
            date: data[i].createdAt
          });
        }
        return gabs;
      });

    const likesP = models.likes.findAll({
        raw: true
      })
      .then(data => {
        // res.json(data);
        data.sort(function(left, right) {
          if (left.msgId > right.msgId) {
            return 1;
          } else if (left.msgId < right.msgId) {
            return -1;
          } else {
            return 0;
          }
        });
        const likes = [];
        for (let i = 0; i < data.length; i++) {
          likes.push(data[i].like.length);
        }
        return likes;
      });

    const destroyP = models.msgs.findAll({
        raw: true
      })
      .then(function(results) {
        const destroyArr = [];
        for (var i = 0; i < results.length; i++) {
          if (req.session.userId == results[i].userId) {
            destroyArr.push(true);
          } else {
            destroyArr.push(false);
          }
        }
        return destroyArr;
      });

    Promise.all([displayNameP, gabsP, likesP, destroyP])
      .then(function(results) {
        const displayName = results[0];
        const gabs = results[1];
        const likes = results[2];
        const destroy = results[3];
        for (let i = 0; i < gabs.length; i++) {
          gabs[i].likes = likes[i];
          gabs[i].destroy = destroy[i];
        }
        res.render('home', {
          displayName: displayName,
          gabs: gabs
        });
      });
  }
});

router.get('/login', function(req, res) {
  res.render('login');
});
router.get('/logout', function(req, res) {
  req.session.userId = null;
  res.redirect('/login');
});
router.get('/signup', function(req, res) {
  res.render('signup');
});
router.get('/new', function(req, res) {
  if (!req.session.userId) {
    res.redirect('/');
  } else {
    res.render('new');
  }
});


router.post('/like/:id', function(req, res) {
  models.likes.findOne({
      where: {
        msgId: req.params.id
      }
    })
    .then(function(like) {
      if (like.like.indexOf(req.session.displayName) < 0) {
        like.like.push(req.session.displayName);
        like.update({
            like: like.like
          }, {
            where: {
              msgId: req.params.id
            }
          })
          .then(function() {
            res.redirect('/');
          });
      } else {
        res.redirect('/');
      }
    });
});

router.post('/delete/:id', function(req, res) {
  models.msgs.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {});
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

  models.users.findOne({
      where: req.body
    })
    .then(function(user) {
      if (user) {
        req.session.userId = user.id;
        req.session.displayName = user.displayName;
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    });
});

module.exports = router;
