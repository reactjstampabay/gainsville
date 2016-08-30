'use strict';
import React, { Component } from 'react';
import { Navigator, StyleSheet, AsyncStorage } from 'react-native';
import {Provider} from 'react-redux';
import configureStore from '../common/store/configureStore';
import StartScreen from './StartScreen';
import _ from 'lodash';
import { receiveProfile } from '../common/actions/user';
import { ASYNC_STORAGE_KEY } from '../common/constants';

const store = configureStore();

// Firebase API below
import { setApi } from '../common/actions/firebase';
import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyCNZF5DzmuE7dKpJvRJwpBFt3mHJOl6fv0',
  authDomain: 'gainsville.firebaseapp.com',
  databaseURL: 'https://gainsville.firebaseio.com',
  storageBucket: 'firebase-gainsville.appspot.com',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }

  componentWillMount() {
    firebase.initializeApp(config);
    store.dispatch(setApi(firebase));
  }

  componentDidMount() {
    AsyncStorage.getItem(ASYNC_STORAGE_KEY)
      .then(profile => {
        if (profile) {
          store.dispatch(receiveProfile(JSON.parse(profile), firebase));
        }
      });
  }

  renderScene(route, nav) {
    if (route.component) {
      // pass navigator and route info
      var props = { navigator: nav, route: route };
      // expose any additional props
      if (route.props) {
        _.assign(props, route.props);
      }
      return React.createElement(route.component, props);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          style={[styles.nav]}
          title="Gainsville"
          renderScene={this.renderScene}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          initialRoute={{
            component: StartScreen, title: 'Welcome to Gainsville'
          }}>
        </Navigator>
      </Provider>
    );
  }
}

var styles = StyleSheet.create({
  nav: {
    flex: 1
  }
});

export default App;