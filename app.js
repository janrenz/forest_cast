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
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
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

app.use(require('forest-express-sequelize').init({
  modelsDir: __dirname + '/models',
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  sequelize: require('./models').sequelize
}));

var cron = require('node-cron');

cron.schedule('*/10 * * * *', function () {
  //running a task every ten minutes
  models.casts.findAll().then(casts => {
    casts.forEach(function (instance) {
      instance.updateAttributes({ age: moment().diff(moment(instance.geburtsdatum, "DD.MM.YYYY"), 'years', false) }, {silent: true});
    });
  })
});

var AWS = require('aws-sdk');

function randomFilename() {
  return require('crypto').randomBytes(48, function (err, buffer) {
    var token = buffer.toString('hex');
  });
}

function updateCast(req, res, next) {
  // Create the S3 client.
  var s3Bucket = new AWS.S3({ params: { Bucket: process.env.S3_BUCKET } });

  // Parse the "data" URL scheme (RFC 2397).
  var rawData = req.body.data.attributes.pictureurl;
  var base64Image = rawData.replace(/^data:image\/\w+;base64,/, '');

  // Generate a random filename.
  var filename = randomFilename();

  var data = {
    Key: filename,
    Body: new Buffer(base64Image, 'base64'),
    ContentEncoding: 'base64',
    ACL: 'public-read'
  };

  // Upload the image.
  s3Bucket.upload(data, function (err, response) {
    if (err) { return reject(err); }

    // Inject the new poster URL to the params.
    req.body.data.attributes.pictureurl = response.Location;

    // Finally, call the default PUT behavior.
    next();
  });
};

router.put('/forest/casts/:castId', liana.ensureAuthenticated, updateCast);

module.exports = app;
