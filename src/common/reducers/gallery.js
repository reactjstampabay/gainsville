import {
  LIKE,
  DISLIKE,
  REFRESH_PICTURES
} from '../actions/gallery';

import _ from 'lodash';

const initialState = {
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
    case REFRESH_PICTURES:
      return refreshPictures(state, action);
    default:
      return state;
  }
};

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
    pictures: action.pictures,
    currentIndex: action.pictures.length > 0 ? 0 : -1
  });
}