const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const liana = require('forest-express-sequelize');
const uuid = require('uuid/v4');

router.put('/forest/casts/:castId', liana.ensureAuthenticated, 
	(req, res, next) => {
        console.log("upload");
		// Create the S3 client.
		var s3Bucket = new AWS.S3({ params: { accessKeyId:  process.env.S3_ACCESS_KEY_ID, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY }});

		// Parse the "data" URL scheme (RFC 2397).
		var rawData = req.body.data.attributes.bild_1;
		if (!rawData) { return next(); }

		var base64Image = rawData.replace(/^data:image\/\w+;base64,/, '');

		// Generate a random filename.
		var filename = `uploaded_media/${uuid()}`;

		var data = {
			Key: filename,
			Body: new Buffer(base64Image, 'base64'),
			ContentEncoding: 'base64',
			ACL: 'public-read'
		};

		// Upload the image.
		s3Bucket.upload(data, function(err, response) {
            if (err) { 
                console.log(err);
                return err;
                
            }

			// Inject the new poster URL to the params.
			req.body.data.attributes.bild_1 = response.Location;

			// Finally, call the default PUT behavior.
			next();
		});
	});

module.exports = router;