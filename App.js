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
import { StyleSheet, View, Dimensions, SafeArea, Text, Image, Button } from 'react-native';
import VerticalBarGraph from '@chartiful/react-native-chart-builder/lib/types';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Agenda } from 'react-native-calendars'
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useState } from 'react/cjs/react.production.min';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{
        width: 250,
        height: 250,
        uri: 'https://cdn-icons.flaticon.com/png/512/6070/premium/6070321.png?token=exp=1653387289~hmac=5797cefd574734689658241200e11415'}} />
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
      <Text style={styles.kleurBlue}>Your data</Text>
      <View style={{ marginTop: 30,alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
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
        
      <Text>       </Text>
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
      
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
      <Text style={styles.kleurGroen}>{heartRate} bps</Text>
      <Text>     </Text>
      <Text style={styles.kleurGroen}>{slaap}hours</Text>
      </View>
      
      <LineChart
    data={{
      labels: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sa"],
      datasets: [
        {
          data: [0,0,0,0,0,0,0]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={200}
    yAxisLabel=""
    yAxisSuffix="°C"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16, 
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginTop: 20,
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  <BarChart
    data={{
      labels: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sa"],
      datasets: [
        {
          data: [6,6.5,7,7.25,5.75,7,6]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel=""
    yAxisSuffix=" Hr(s)"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#eee",
      decimalPlaces: 1, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
    </View>
    

    
  
  );
}

var heartRate = 0 ;
var slaap = 0 ;

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