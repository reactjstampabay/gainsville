import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyCNZF5DzmuE7dKpJvRJwpBFt3mHJOl6fv0",
  authDomain: "gainsville.firebaseapp.com",
  databaseURL: "https://gainsville.firebaseio.com",
  storageBucket: "firebase-gainsville.appspot.com",
};

export function getCurrentValue(ref) {
  return new Promise(
    (resolve, reject) => {
      ref.on('value', function(snapshot) {
        ref.off('value'); // No longer need updates once we have a value
        return resolve(snapshot.val());
      });
    }
  );
}

export function feed() {
  return new Promise(
    (resolve, reject) => {
      firebase.initializeApp(config);
      var picturesRef = db.ref('/pictures');
      picturesRef.orderByChild('created_at')
        .limitToLast(100)
        .on('value', function(snapshot) {
          var pictureList = snapshot.val();
          var pictures = [];
          Object.keys(pictureList).forEach(function(id) {
            pictureList[id].id = id;
            pictures.push(pictureList[id]);
          });
          picturesRef.off('value');
          return resolve({pictures: pictures})
        });
    }
  );
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    firebase.initializeApp(config);
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(result) {
        resolve(result);
      })
      .catch(function(err) {
        if (err.code === 'auth/user-not-found') {
          firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function(result) {
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

export function like(id) {
  return new Promise(
    (resolve, reject) => {
      // TODO: Upgrade to new Firebase convention
      var pictureRef = new Firebase('https://gainsville.firebaseio.com/pictures/' + id);
      this.getCurrentValue(pictureRef)
        .then((value) => {
          var nice_gains_bruh = value.nice_gains_bruh || 0;
          nice_gains_bruh += 1;
          pictureRef.update({
            nice_gains_bruh: nice_gains_bruh
          });
          return resolve(true);
        })
        .catch((err) => {
          return reject(err);
        })
    }
  );
}

export function dislike(id) {
  return new Promise(
    (resolve, reject) => {
      // TODO: Upgrade to new Firebase convention
      var pictureRef = new Firebase('https://gainsville.firebaseio.com/pictures/' + id);
      this.getCurrentValue(pictureRef)
        .then((value) => {
          var bruh_do_you_lift = value.bruh_do_you_lift || 0;
          bruh_do_you_lift += 1;
          pictureRef.update({
            bruh_do_you_lift: bruh_do_you_lift
          });
          return resolve(true);
        })
        .catch((err) => {
          return reject(err);
        })
    }
  );
}