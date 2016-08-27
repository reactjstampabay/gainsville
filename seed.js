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
  {url: 'http://3.bp.blogspot.com/_CGdbWRAh_KI/SSdB73ru-bI/AAAAAAAAA5I/8vpX7dAoTxE/s400/HacksawJimDuggan.jpg', user_name: 'Jim'},
  {url: 'http://i3.coventrytelegraph.net/incoming/article7359444.ece/ALTERNATES/s615/curthennig.jpg', user_name: 'Curt'},
  {url: 'https://s-media-cache-ak0.pinimg.com/236x/31/b4/78/31b478375af79310b44b4772bfd8be95.jpg', user_name: 'Ric'},
  {url: 'http://cdn.bleacherreport.net/images_root/slides/photos/001/096/369/images-17_display_image.jpg?1310690322', user_name: 'Randy'},
  {url: 'https://the5iveblog.files.wordpress.com/2015/04/daveyboysmith_display_image.jpg', user_name: 'Davey'},
  {url: 'http://images2.houstonpress.com/imager/u/original/6775956/razor1.jpg', user_name: 'Razor'},
  {url: 'http://www.revelstokemountaineer.com/wp-content/uploads/2015/11/jts.jpg', user_name: 'Jake'},
  {url: 'https://i.ytimg.com/vi/455GalbifH8/hqdefault.jpg', user_name: 'Warrior'},
  {url: 'http://2.bp.blogspot.com/_H8hh1K-R3qo/TUHuC4TMatI/AAAAAAAAAMg/heH-xvbb1Uw/s1600/iron-sheik.JPG', user_name: 'Sheik'},
  {url: 'http://images.complex.com/complex/image/upload/c_limit,fl_progressive,q_80,w_680/tzdz3irrzczhlcm69xvl.jpg', user_name: 'Honky'}
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
