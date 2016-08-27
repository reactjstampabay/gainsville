import { combineReducers } from 'redux';
import { user } from './user';
import { firebase } from './firebase';
import { gallery } from './gallery';

const rootReducer = combineReducers({
  user,
  firebase,
  gallery
});

export default rootReducer;
