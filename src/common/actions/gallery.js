import * as FirebaseService from '../services/firebase';

export const LIKE = 'LIKE';
export const DISLIKE = 'DISLIKE';
export const INITIATE_REFRESH_PICTURES = 'INITIATE_REFRESH_PICTURES';
export const REFRESH_PICTURES = 'REFRESH_PICTURES';

function initiateRefreshPictures() {
  return {
    type: INITIATE_REFRESH_PICTURES
  };
}

export function refreshPictures(firebase) {
  return dispatch => {
    dispatch(initiateRefreshPictures());
    FirebaseService.feed(firebase)
      .then(response => {
        dispatch({
          type: REFRESH_PICTURES,
          pictures: response.pictures
        });
      })
      .catch(error => {
        dispatch({
          type: REFRESH_PICTURES,
          error: error
        })
      });
  }
}

export function like(id, firebase) {
  return dispatch => {
    FirebaseService.like(id, firebase)
      .then(() => {
        dispatch({
          type: LIKE,
          id: id
        });
      })
      .catch(error => {
        dispatch({
          type: LIKE,
          error: error
        })
      });
  }
}

export function dislike(id, firebase) {
  return dispatch => {
    FirebaseService.dislike(id, firebase)
      .then(() => {
        dispatch({
          type: DISLIKE,
          id: id
        })
      })
      .catch(error => {
        dispatch({
          type: DISLIKE,
          id: id
        })
      });
  }
}