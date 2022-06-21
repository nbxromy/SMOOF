/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Image
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
          <Image
            source={{uri:'https://cdn-icons.flaticon.com/png/512/6070/premium/6070321.png?token=exp=1655281453~hmac=be1a43e96fc802666e016d8f0f3c04ab', 
            width: 250, height:250 }} />
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
