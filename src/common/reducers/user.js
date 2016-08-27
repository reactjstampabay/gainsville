import {
  INITIATE_LOGIN,
  RECEIVE_PROFILE
} from '../actions/user';

import _ from 'lodash';

const initialState = {
  status: 'initial',
  profile: null
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_LOGIN:
      return initiateLogin(state, action);
    case RECEIVE_PROFILE:
      return receiveProfile(state, action);
    default:
      return state;
  }
};

function initiateLogin(state) {
  return Object.assign({}, state,  {
    status: 'authenticating'
  });
}

function receiveProfile(state, action) {
  return Object.assign({}, state, {
    profile: action.profile,
    error: action.error,
    status: action.error ? 'unauthorized' : 'authorized'
  });
}