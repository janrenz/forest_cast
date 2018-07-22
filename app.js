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



function updateKandidat(req, res, next) {
  console.log("UPDATE");
  var s3Bucket = new AWS.S3({ params: {  accessKeyId:  process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY } });
  // Parse the "data" URL scheme (RFC 2397).
  var rawData1 = req.body.data.attributes.bild_1;
  if (rawData1){
    var base64Image = rawData1.replace(/^data:image\/\w+;base64,/, '');
    var filename = randomFilename();
    var data = {
      Key: filename,
      Body: new Buffer(base64Image, 'base64'),
      ContentEncoding: 'base64',
      ACL: 'public-read'
    };
  
    s3Bucket.upload(data, function (err, response) {
      console.log('uploaded');
      if (err) { return reject(err); }
      console.log('response.Location');
      // Inject the new poster URL to the params.
      req.body.data.attributes.bild_1 = response.Location;
      // Finally, call the default PUT behavior.
      next();
    });
  }
};

//displayRoutes(app);
router.put('/forest/kandidaten/:id', liana.ensureAuthenticated, updateKandidat);
router.put('/forest/kandidaten/:kandidatId', liana.ensureAuthenticated, updateKandidat);
router.put('/forest/kandidaten/:kandidatenId', liana.ensureAuthenticated, updateKandidat);


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
