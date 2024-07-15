import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import HomeScreen from './src/HomeScreen';
import VideoScreen from './src/VideoScreen';

enableScreens();
const Stack = createNativeStackNavigator();

function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator intialRouteName='Home' screenOptions={{headerShown:false}}>
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Video' component={VideoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;