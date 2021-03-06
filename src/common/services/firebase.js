import uuid from 'uuid';
import * as MediaService from './media';

export function getLoggedInSession(accessToken, firebase) {
  return new Promise(
    function(resolve, reject) {
      let temp = 'this';
      firebase.auth().signInWithCustomToken(accessToken)
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    }
  );
}

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

export function feed(firebase) {
  return new Promise(
    (resolve, reject) => {
      let picturesRef = firebase.database().ref('/pictures');
      picturesRef.orderByChild('created_at')
        .limitToLast(100)
        .on('value', function(snapshot) {
          let pictureList = snapshot.val();
          let pictures = [];
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

export function login(email, password, firebase) {
  return new Promise((resolve, reject) => {
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
              return resolve(result);
            })
            .catch(function(err) {
              return reject(err);
            });
        } else {
          reject(err);
        }
      });
  });
}

export function logout() {
  return new Promise(
    (resolve, reject) => {
      firebase.auth().signOut()
        .then(result => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    }
  );
}

export function like(id, firebase) {
  return new Promise(
    (resolve, reject) => {
      let pictureRef = firebase.database().ref('/pictures/' + id);
      this.getCurrentValue(pictureRef)
        .then((value) => {
          let nice_gains_bruh = value.nice_gains_bruh || 0;
          nice_gains_bruh += 1;
          return pictureRef.update({
            nice_gains_bruh: nice_gains_bruh
          });
        })
        .then(() => {
          return resolve(true);
        })
        .catch((err) => {
          return reject(err);
        })
    }
  );
}

export function dislike(id, firebase) {
  return new Promise(
    (resolve, reject) => {
      let pictureRef = firebase.database().ref('/pictures/' + id);
      this.getCurrentValue(pictureRef)
        .then((value) => {
          let bruh_do_you_lift = value.bruh_do_you_lift || 0;
          bruh_do_you_lift += 1;
          return pictureRef.update({
            bruh_do_you_lift: bruh_do_you_lift
          });
        })
        .then(() => {
          return resolve(true);
        })
        .catch((err) => {
          return reject(err);
        })
    }
  );
}

export function uploadPicture(base64Image, profile, firebase) {
  return new Promise(
    (resolve, reject) => {
      let picturesRef = firebase.database().ref('/pictures');
      MediaService.uploadPicture(profile.stsTokenManager.accessToken, base64Image.data)
        .then(response => {
          return picturesRef
            .child(uuid.v4())
            .set({
              url: response.url,
              user_name: profile.email
            });
        })
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject(err);
        });
    }
  );
}