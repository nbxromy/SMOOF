// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// In App.js in a new project

import * as React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, SafeArea, Text, Image, Button, Alert } from 'react-native';
import VerticalBarGraph from '@chartiful/react-native-chart-builder/lib/types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Agenda } from 'react-native-calendars'
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import ProfileScreen from "./Components/HomeScreen/ProfileScreen";

var heartRate = 0 ;
var slaap = 0 ;
var IsSleeping = false;
var IsWalking = false;
var IsSleepwalking = false;

function sleepwalk(){
  if (IsSleeping && IsWalking){
    return sleepAlert
  }
}


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;