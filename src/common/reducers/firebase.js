import { SET_API } from '../actions/firebase';

const initialState = {
  api: null
};

export const firebase = (state = initialState, action) => {
  switch(action.type) {
    case SET_API:
      return setApi(state, action);
    default:
      return state;
  }
};

function setApi(state, action) {
  return Object.assign({}, state, {
    api: action.api
  });
}