import {
  LIKE,
  DISLIKE,
  INITIATE_REFRESH_PICTURES,
  REFRESH_PICTURES,
  UPLOAD,
  UPLOAD_COMPLETE,
  UPLOAD_ERROR
} from '../actions/gallery';

const initialState = {
  status: 'initial',
  uploading: {
    image: null,
    error: null
  },
  liked: [],
  disliked: [],
  pictures: [],
  currentIndex: -1
};

export const gallery = (state = initialState, action) => {
  switch(action.type) {
    case LIKE:
      return like(state, action);
    case DISLIKE:
      return dislike(state, action);
    case INITIATE_REFRESH_PICTURES:
      return initiateRefreshPictures(state);
    case REFRESH_PICTURES:
      return refreshPictures(state, action);
    case UPLOAD:
      return upload(state, action);
    case UPLOAD_COMPLETE:
      return uploadComplete(state);
    case UPLOAD_ERROR:
      return uploadError(state, action);
    default:
      return state;
  }
};

function uploadError(state, action) {
  return Object.assign({}, state, {
    uploading: {
      image: state.uploading.image,
      error: action.error
    }
  });
}

function upload(state, action) {
  return Object.assign({}, state, {
    uploading: {
      image: action.base64Image,
      error: null
    }
  });
}

function uploadComplete(state) {
  return Object.assign({}, state, {
    uploading: initialState.uploading
  });
}

function initiateRefreshPictures(state) {
  return Object.assign({}, state, {
    status: 'refreshing'
  });
}

function like(state, action) {
  return Object.assign({}, state, {
    liked: [
      ...state.liked.slice(0),
      action.id
    ],
    currentIndex: state.currentIndex + 1 < state.pictures.length ? state.currentIndex + 1 : 0
  });
}

function dislike(state, action) {
  return Object.assign({}, state, {
    disliked: [
      ...state.disliked.slice(0),
      action.id
    ],
    currentIndex: state.currentIndex + 1 < state.pictures.length ? state.currentIndex + 1 : 0
  });
}

function refreshPictures(state, action) {
  return Object.assign({}, state, {
    status: 'refreshed',
    pictures: action.pictures,
    currentIndex: action.pictures.length > 0 ? 0 : -1
  });
}