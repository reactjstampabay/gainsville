var Promise = require('bluebird');
var firebase = require('firebase');


module.exports = {
  initialize: initialize
};

function initialize() {
  return new Promise(
    function(resolve, reject) {
      initializeFirebase()
        .then(function(firebase) {
          return resolve({firebase: firebase});
        })
        .catch(function(err) {
          return reject(err);
        });
    }
  )
}

function initializeFirebase() {
  return new Promise(
    function(resolve, reject) {
      const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET
      };

      firebase.initializeApp(config);
      resolve(firebase);
    }
  );
}