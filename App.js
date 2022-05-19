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
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import VerticalBarGraph from '@chartiful/react-native-chart-builder/lib/types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{
        width: 250,
        height: 250,
        uri: 'https://cdn-icons.flaticon.com/png/512/6070/premium/6070321.png?token=exp=1652846128~hmac=9f435e53793cd79231d3986f73b06b29'}} />
      <Text style={styles.kleurGroen}>Please connect your device</Text>
      <Button
        title="Connect to the app"
        onPress={() => navigation.navigate('Logout')}
      />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center' , marginTop: 25 }}>
      <Text style={styles.kleurBlue}>Je data</Text>
      <View style={{flex: 1, right: 100, margin: 40}}>
      <Image 
        style= {{
          width: 50,
          height: 50,
          resizeMode: 'contain'
        }}
        source={{
          uri: 'https://cdn-icons.flaticon.com/png/512/1818/premium/1818145.png?token=exp=1652867719~hmac=bbb63cc9acd2dfca5ddb75fb0d25584c'
        }}
        />
      <Text style={styles.kleurGroen}>0 bps</Text>
      <Image 
        style= {{
          width: 50,
          height: 50,
          resizeMode: 'contain'
        }}
        source={{
          uri: 'https://cdn-icons.flaticon.com/png/512/2992/premium/2992422.png?token=exp=1652867764~hmac=6e92bf36deb70091a9877462327448f9'
        }}
        />
      <Text style={styles.kleurGroen}>0 hour(s)</Text>
      
      </View>
    </View>
  
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Logout" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  kleurBlue: {
    color: 'rgb(39, 76, 119)',
    fontWeight: 'bold',
    fontSize: 25,
  },

  kleurGroen: {
    color: 'rgb(86, 227, 159)',
    fontWeight: 'bold',
    fontSize: 20,
  }
});

export default App;