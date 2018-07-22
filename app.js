'use strict';
var fs = require('fs');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('express-cors');
var jwt = require('express-jwt');
var router = express.Router();
var app = express();
var liana = require('forest-express-sequelize');
var moment = require('moment');

var models = require('./models');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false, limit: '250mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  allowedOrigins: ['*.forestadmin.com'],
  headers: ['Authorization', 'X-Requested-With', 'Content-Type']
}));

app.use(jwt({
  secret: process.env.FOREST_AUTH_SECRET,
  credentialsRequired: false
}));

fs.readdirSync('./routes').forEach((file) => {
  if (file !== '.gitkeep') {
    app.use('/forest', require('./routes/' + file));
  }
});

fs.readdirSync('./decorators/routes').forEach((file) => {
  if (file[0] !== '.') {
    app.use('/forest', require(`./decorators/routes/${file}`));
  }
});

app.use(require('forest-express-sequelize').init({
  modelsDir: __dirname + '/models',
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  sequelize: require('./models').sequelize
}));

var AWS = require('aws-sdk');

function randomFilename() {
  return require('crypto').randomBytes(48, function (err, buffer) {
    var token = buffer.toString('hex');
  });
}


module.exports = app;
