'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import { refreshPictures } from '../common/actions/gallery';
import Swiper from '../components/Swiper';
import NavigationBar from '../components/NavigationBar';
import GainsvilleCamera from './GainsvilleCamera';

let window = Dimensions.get('window');

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this._showYourGains = this._showYourGains.bind(this);
  }

  componentWillMount() {
    const { dispatch, firebase } = this.props;
    dispatch(refreshPictures(firebase.api));
  }

  _showYourGains() {
    const { navigator, user, firebase } = this.props;
    navigator.push({
      component: GainsvilleCamera,
      props: {user: user, firebase: firebase}
    });
  }

  render() {
    const { user, gallery, firebase, navigator, dispatch } = this.props;
    return (
      <Image style={[styles.background]} source={require('../assets/images/background.png')} resizeMode="cover">
        <NavigationBar hasLogoutButton={true} navigator={navigator}></NavigationBar>
        <Swiper user={user} gallery={gallery} firebase={firebase} navigator={navigator} dispatch={dispatch}></Swiper>
        <TouchableHighlight onPress={this._showYourGains} style={[styles.cameraButton]}>
          <Text style={[styles.cameraButtonText]}>Show Your Gains</Text>
        </TouchableHighlight>
      </Image>
    );
  }
}

var styles = StyleSheet.create({
  background: {
    flex: 1,
    height: window.height,
    width: window.width,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: 40
  },
  cameraButton: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    width: window.width,
    alignItems: 'center',
    backgroundColor: '#a60707',
    padding: 20
  },
  cameraButtonText: {
    color: '#fff',
    fontSize: 16
  }
});

function mapStateToProps(state) {
  const { user, gallery, firebase } = state;
  return {
    user,
    gallery,
    firebase
  };
}

export default connect(mapStateToProps)(HomeScreen);