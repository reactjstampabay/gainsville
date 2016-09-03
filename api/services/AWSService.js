var AWS = require('aws-sdk');
var Promise = require('bluebird');
var uuid = require('uuid');
var gm = require('gm').subClass({ imageMagick: true });

// Scaffold AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

var S3 = {
  bucket: process.env.S3_BUCKET,
  url: process.env.S3_URL
};

module.exports = {
  upload: upload
};

function upload(picture) {
  return new Promise(
    function(resolve, reject) {
      var s3 = new AWS.S3();
      var buffer = new Buffer(picture.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      var fileKey = uuid.v4() + '.png';
      // Convert to JPG and compress
      gm(buffer, fileKey)
        .quality(60)
        .toBuffer('JPG', function(err, jpgBuffer) {
          if (err) {
            return reject(err);
          } else {
            var params = {
              ACL: 'public-read',
              Key: fileKey.replace('.png', '.jpg'),
              Bucket: S3.bucket,
              Body: jpgBuffer,
              ContentEncoding: 'base64',
              ContentType: 'image/jpeg'
            };

            s3.putObject(params, function(err, data){
              if (err) {
                reject(err)
              } else {
                // Grab the URL
                s3.getSignedUrl('getObject',
                  {
                    Key: fileKey.replace('.png', '.jpg'),
                    Bucket: S3.bucket
                  }, function(err, url) {
                    var unsignedUrl = url.substring(0, url.indexOf('?'));
                    resolve({url: unsignedUrl});
                  });
              }
            });
          }
        });
    }
  );
}
