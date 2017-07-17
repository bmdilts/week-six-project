const express = require('express');
const app = express();
const router = express.Router();
const mainRouter = require('./routes/routes');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const fs = require('fs');
const validator = require('express-validator');
// const models = require('../models');
// const sequelize = require('sequelize')
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static('public'));
app.use(validator());

app.use('/', mainRouter);

app.listen(3000, function(){
  console.log('Hey, Listen!');
});
