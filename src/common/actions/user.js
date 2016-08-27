import * as FirebaseService from '../../services/firebase';

export const INITIATE_LOGIN = 'INITIATE_LOGIN';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';

export function login(email, password, firebase) {
  return dispatch => {
    dispatch({type: INITIATE_LOGIN});
    FirebaseService.login(email, password, firebase)
      .then(result => {
        dispatch({
          type: RECEIVE_PROFILE,
          profile: result
        });
      })
      .catch(error => {
        dispatch({
          type: RECEIVE_PROFILE,
          error: error
        });
      });
  }
}