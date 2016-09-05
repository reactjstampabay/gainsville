import React from 'react';
import { View, Image } from 'react-native';

const ImagePreloader = ({gallery}) => {
  return (
    // By creating "invisible" Image views, we are forcing RN to precache the images we want to display
    <View style={[{height: 0, width: 0}]}>
      {gallery.pictures.map(picture => {
        return (
          <Image key={picture.id} source={{uri: picture.url}}></Image>
        );
      })}
    </View>
  );
};

export default ImagePreloader;