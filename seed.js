'use strict';

var Promise = require('bluebird');
var firebase = require('firebase');
var config = {
  apiKey: "AIzaSyCNZF5DzmuE7dKpJvRJwpBFt3mHJOl6fv0",
  authDomain: "gainsville.firebaseapp.com",
  databaseURL: "https://gainsville.firebaseio.com",
  storageBucket: "firebase-gainsville.appspot.com",
};
firebase.initializeApp(config);
var db = firebase.database();

function getCurrentValue(ref) {
  return new Promise(
    (resolve, reject) => {
      ref.on('value', function(snapshot) {
        ref.off('value'); // No longer need updates once we have a value
        return resolve(snapshot.val());
      });
    }
  );
}

function like(id, firebase) {
  return new Promise(
    (resolve, reject) => {
      let pictureRef = firebase.database().ref('/pictures/' + id);
      getCurrentValue(pictureRef)
        .then((value) => {
          let nice_gains_bruh = value.nice_gains_bruh || 0;
          nice_gains_bruh += 1;
          return pictureRef.update({
            nice_gains_bruh: nice_gains_bruh
          });
        })
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          return reject(err);
        })
    }
  );
}

function login(email, password) {
  return new Promise((resolve, reject) => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(result) {
        console.log(JSON.stringify(result));
        resolve(result);
      })
      .catch(function(err) {
        if (err.code === 'auth/user-not-found') {
          firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(result) {
              console.log(JSON.stringify(result));
              resolve(result);
            })
            .catch(function(err) {
              reject(err);
            });
        } else {
          reject(err);
        }
      });
  });
}

const wrestlers = [
  {url: 'https://gainsville.firebaseapp.com/iron-sheik.JPG', user_name: 'Sheik'},
  {url: 'https://gainsville.firebaseapp.com/the-rock.jpg', user_name: 'Rock'},
];
var uuid = require('uuid');

var setPromises = wrestlers.map(function(wrestler) {
  wrestler.created_at = new Date().getTime();
  return db.ref('pictures/' + uuid.v4())
    .set(wrestler);
});

Promise.all(setPromises)
  .then(login('fake@gmail.com', 'password'))
  .then(function() {
    console.log('And there was much rejoicing');
    process.exit(0);
  })
  .catch(function(err) {
    process.exit(err);
  });

// like('fd25475a-20cd-47ae-96be-95c975afa930', firebase)
//   .then(function(result) {
//     console.log(result);
//     process.exit(0);
//   });
