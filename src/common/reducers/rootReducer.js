import { combineReducers } from 'redux';
import { user } from './user';
import { firebase } from './firebase';

const rootReducer = combineReducers({
  user,
  firebase
});

export default rootReducer;
