'use strict';

import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableHighlight } from 'react-native';
import Camera from 'react-native-camera';
import NavigationBar from '../components/NavigationBar';
import * as FirebaseService from '../common/services/firebase';
import { upload } from '../common/actions/gallery';

class GainsvilleCamera extends Component {
  constructor(props) {
    super(props);

    this._takePicture = this._takePicture.bind(this);
  }

  _takePicture() {
    const { user, firebase, navigator, dispatch } = this.props;
    var self = this;
    this.camera.capture()
      .then((data) => {
        dispatch(upload(data, user.profile, firebase.api));
        navigator.pop();
      })
      .catch(error => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar navigator={this.props.navigator} hasBackButton={true}></NavigationBar>
        <View>
          <Camera
            captureTarget={Camera.constants.CaptureTarget.memory}
            ref={(cam) => {
              this.camera = cam;
            }}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
          </Camera>
        </View>
        <View style={[styles.cameraControlsContainer]}>
          <TouchableHighlight style={styles.takePictureWrapper}
                              onPress={this._takePicture}>
            <View style={styles.takePicture}/>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraControlsContainer: {
    flex: 1,
    backgroundColor: "#384a5b",
    justifyContent: 'center'
  },
  viewFinder: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  takePicture: {
    backgroundColor: '#02e0ef',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  takePictureWrapper: {
    backgroundColor: '#02c0ef',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    left: 150
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#a60707',
    borderRadius: 3,
    color: '#fff',
    padding: 10,
    margin: 40
  }
});

export default GainsvilleCamera;