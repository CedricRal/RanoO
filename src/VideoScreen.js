import React, {useRef, useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Video, {VideoRef} from 'react-native-video';
import { AppContext } from '../AppContext';
import {Immersive} from 'react-native-immersive';

function VideoScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const { sharedVariable, setSharedVariable } = useContext(AppContext);
    const navAndFull = () => {
      Immersive.on();
      Immersive.setImmersive(true);
      setSharedVariable(false);
      navigation.navigate('Home'); 
    }

    useEffect(() => {
      if (sharedVariable) {{
        console.log('ici');
        Immersive.on();
        Immersive.setImmersive(true);
        setSharedVariable(false);
        navigation.navigate('Home'); 
        console.log('immersive', Immersive.getImmersive());
      }}
    }, [sharedVariable, setSharedVariable, navigation, Immersive]);
  
    return (
      <Video source={{uri : route.params.lien}}
              ref={VideoRef}
              fullscreen={true}
              style={styles.backgroundVideo}
              paused={sharedVariable}
              onEnd={navAndFull}/>
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