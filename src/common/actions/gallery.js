import * as FirebaseService from '../services/firebase';

export const UPLOAD = 'UPLOAD';
export const UPLOAD_COMPLETE = 'UPLOAD_COMPLETE';
export const UPLOAD_ERROR = 'UPLOAD_ERROR';
export const LIKE = 'LIKE';
export const DISLIKE = 'DISLIKE';
export const INITIATE_REFRESH_PICTURES = 'INITIATE_REFRESH_PICTURES';
export const REFRESH_PICTURES = 'REFRESH_PICTURES';

function initiateRefreshPictures() {
  return {
    type: INITIATE_REFRESH_PICTURES
  };
}

export function uploadError(error) {
  return {
    type: UPLOAD_ERROR,
    error: error
  };
}

export function upload(base64Image, profile, firebase) {
  return dispatch => {
    dispatch({type: UPLOAD, base64Image: base64Image});
    FirebaseService.uploadPicture(base64Image, profile, firebase)
      .then(response => {
        return FirebaseService.feed(firebase);
      })
      .then(response => {
        dispatch({
          type: REFRESH_PICTURES,
          pictures: response.pictures
        });

        dispatch({
          type: UPLOAD_COMPLETE
        });
      })
      .catch(error => {
        dispatch(uploadError(error));
      });
  }
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