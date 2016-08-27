import {createStore, compose} from 'redux';
import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunkMiddleware, createLogger()))
  );
};
