import * as FirebaseService from '../services/firebase';

export const INITIATE_LOGIN = 'INITIATE_LOGIN';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const GET_LOGGED_IN_SESSION = 'GET_LOGGED_IN_SESSION';
export const LOGOUT = 'LOGOUT';

export function getLoggedInSession(profile, firebase) {
  return dispatch => {
    FirebaseService.getLoggedInSession(profile.stsTokenManager.accessToken, firebase)
      .then(result => {
        dispatch(receiveProfile(profile, firebase));
      })
      .catch(error => {
        dispatch({
          type: LOGOUT
        });
      });
  }
}

export function login(email, password, firebase) {
  return dispatch => {
    dispatch({type: INITIATE_LOGIN});
    FirebaseService.login(email, password, firebase)
      .then(result => {
        dispatch({
          type: RECEIVE_PROFILE,
          profile: JSON.parse(JSON.stringify(result))
        });
      })
      .catch(error => {
        dispatch({
          type: LOGOUT
        });
      });
  }
}

export function receiveProfile(profile, firebase) {
  return {
    type: RECEIVE_PROFILE,
    profile: profile
  };
}

export function logout() {
  return dispatch => {
    FirebaseService.logout()
      .then(() => {
        dispatch({
          type: LOGOUT
        });
      })
      .catch(error => {
        dispatch({
          type: LOGOUT,
          error: error
        });
      });

  }
}