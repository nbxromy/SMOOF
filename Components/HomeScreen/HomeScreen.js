/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView
} from 'react-native';
//import { withNavigation } from 'react-navigation';
import ProfileScreen from './ProfileScreen';
//import App from 'C:/Users/hendr/Documents/GitHub/SMOOF/App';


const URL_CONTACTS = 'http://localhost:3004/contact'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

     // const [isShowingText, setIsShowingText] = useState(true);

    this.state = {
    }
    }

  render() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.kleurGroen}>Please connect your device</Text>
            <Button
                title="Connect to the app"
                onPress={() => this.props.navigation.navigate('ProfileScreen')}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
