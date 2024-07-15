import React, { useState, useEffect, useRef } from 'react';
import {View, Text, TouchableOpacity, ImageBackground, FlatList, StyleSheet, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import KeepAwake from 'react-native-keep-awake';
import {Immersive} from 'react-native-immersive';

function HomeScreen() {
    const image = require('../assets/fond.png');
    const navigation = useNavigation();

    const [devices, setDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);
    const [message, setMessage] = useState('');
    const [responseReceived, setResponseReceived] = useState('start');
    const intervalRef = useRef(null);
    const [videoUri, setVideoUri] = useState(null);

    useEffect(() => {
        Immersive.on();
        Immersive.setImmersive(true);
        const getBondedDevices = async () => {
        try {
            const bondedDevices = await RNBluetoothClassic.getBondedDevices();
            setDevices(bondedDevices);
        } catch (error) {
            console.error(error);
        }
        };

        getBondedDevices();

        // Cleanup interval on unmount
        return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        };
    }, []);

    const connectToDevice = async (device) => {
        try {
          const connected = await RNBluetoothClassic.connectToDevice(device.id);
          if (connected) {
            setConnectedDevice(device);
            startReading(device);
          }
        } catch (error) {
          console.error(error);
        }
    };

    const startReading = (appareil) => {
        console.log(appareil);
        intervalRef.current = setInterval(async () => {
          if (appareil) {
            try {
              const box = await appareil.read();
              if (box != null) {
                console.log('data :', box, box.length);
                setResponseReceived((prevResponse) => {
                  console.log('prevResponse :', prevResponse);
                  console.log('newResponse :', box);
                  return box;
                });
                if (box === "O\n"){navigation.navigate('Video', {lien:videoUri})}
              }
            } catch (error) {
              console.log(error);
            }
          }
        }, 100); // Lire les données toutes les secondes
    };

    const selectVideo = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.video],
        });
        console.log(res);
        setVideoUri(res[0].uri);
        console.log(videoUri);
        Immersive.on();
        Immersive.setImmersive(true);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled the picker');
        } else {
          throw err;
        }
      }
    };

    return(
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground source={image} resizeMode='stretch' style={styles.bgImg}>
            {!videoUri && (<TouchableOpacity style={styles.vidbtn} onPress={selectVideo}><Text style={{alignSelf:'center'}}>select</Text></TouchableOpacity>)}
            <View style={{ padding: 20 , width:300, alignSelf:'center'}}>
                {!connectedDevice && (
                    <>
                    <Text style={styles.txt}>Appareils Bluetooth appairés :</Text>
                    <FlatList
                        data={devices}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                        <TouchableOpacity style={styles.button} onPress={() => connectToDevice(item)}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                        )}
                    />
                    </>
                )}
            </View>
            </ImageBackground>
            <KeepAwake/>
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
  },
  bgImg: {
    flex:1,
    justifyContent:'center',
    width:'100%',
    height:'100%'
  },
  txt: {
    fontSize: 18,
    alignSelf: 'center',
  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    elevation: 2,
    backgroundColor: 'khaki',
    alignSelf:'center',
  },
  vidbtn: {
    width: 50,
    height: 20,
    borderRadius:10,
    backgroundColor: 'gold',
    position: 'absolute',
    top: 20,
    right: 20,
  },
});



export default HomeScreen;