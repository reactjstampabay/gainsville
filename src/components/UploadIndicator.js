'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

const UploadIndicator = ({gallery}) => {
  return (
    <View style={[styles.activityIndicatorSection]}>
      <ActivityIndicator style={[styles.activityIndicator]} size="small" animating={true} />
      <Text style={[styles.activityIndicatorText]}>Uploading, please wait...</Text>
      <Image style={[{height: 50, width: 50}]}
             source={{uri: 'data:image/png;base64,' + gallery.uploading.image.data}} />
    </View>
  );
};

let styles = StyleSheet.create({
  activityIndicatorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  activityIndicatorText: {
    color: '#fff'
  }
});

export default UploadIndicator;