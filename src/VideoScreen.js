import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Video, {VideoRef} from 'react-native-video';
import {Immersive} from 'react-native-immersive';

function VideoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
  
    return (
      <Video source={{uri : route.params.lien}}
              ref={VideoRef}
              fullscreen={true}
              style={styles.backgroundVideo}
              onEnd={() => {
                navigation.navigate('Home'); 
                Immersive.on();
                Immersive.setImmersive(true);
              }}/>
    );
  }

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
      },
})

export default VideoScreen;