/* @flow */

import React, { Component,useState } from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { StyleSheet, View, ScrollView, Dimensions, SafeArea, Text, Image, Button, Alert } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';




const URL_CONTACTS = 'http://localhost:3004/contact'

//var options = {authorization : YOUR_API_KEY , message : 'Test message' ,  numbers : ['062364091']} 




export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        // const [isShowingText, setIsShowingText] = useState(true);

        this.state = {
            fb_data: [0],
            fb_dates: [0],
            ready: "no"
        }
    }

    showAlert1() {  
        Alert.alert(  
            'Alert Title',  
            'My Alert Msg',  
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () => console.log('OK Pressed')},  
            ]  
        );  
    }

    get_fitbit_data = () => {
        //var now = new Date().toISOString().slice(0, 10) #doesn't work yet
        const access_tokenHD = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhDUFoiLCJzdWIiOiI5V1ZaOEciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd251dCB3cHJvIHdzbGUgd3dlaSB3c29jIHdzZXQgd2FjdCB3bG9jIiwiZXhwIjoxNjU2NjQ2ODc5LCJpYXQiOjE2NTQwNjg4OTB9.1JLYzCU40wOA_sfRBoedn6kfJJuXoh0r2-bRmpXzx4Q"

        fetch('https://api.fitbit.com/1.2/user/-/sleep/date/2022-05-18/2022-05-25.json', {
            method: "GET",
            headers: { "Authorization": "Bearer " + access_tokenHD }
        })
            .then(res => { return res.json() })
            .then(res => {
                var data = [];
                var dates = [];
                data[0] = convert_data(res['sleep'][6]['minutesAsleep']),
                data[1] = convert_data(res['sleep'][5]['minutesAsleep']),
                data[2] = convert_data(res['sleep'][4]['minutesAsleep']),
                data[3] = convert_data(res['sleep'][3]['minutesAsleep']),
                data[4] = convert_data(res['sleep'][2]['minutesAsleep']),
                data[5] = convert_data(res['sleep'][1]['minutesAsleep']),
                data[6] = convert_data(res['sleep'][0]['minutesAsleep']),
                dates[0] = res['sleep'][6]['dateOfSleep'],
                dates[1] = res['sleep'][5]['dateOfSleep'],
                dates[2] = res['sleep'][4]['dateOfSleep'],
                dates[3] = res['sleep'][3]['dateOfSleep'],
                dates[4] = res['sleep'][2]['dateOfSleep'],
                dates[5] = res['sleep'][1]['dateOfSleep'],
                dates[6] = res['sleep'][0]['dateOfSleep'];
                this.setState({ fb_data: data })
                this.setState({fb_dates: dates })
                this.setState({ ready: "yes" })
            });
    }

    componentDidMount() {
        this.get_fitbit_data();
    }

    

    render() {
        return (
            <View style={styles.container}>
                <SwiperFlatList paginationDefaultColor='rgb(39, 76, 119)' paginationActiveColor='rgb(86, 227, 159)' showPagination>
                
                 <View style={[styles.child, {backgroundColor: 'white'}]}>
                 <Text style={{color: 'rgb(39, 76, 119)', fontWeight: 'bold', fontSize: 20}}>Your sleep</Text>
                  <BarChart
                    data={{
                        labels: this.state.fb_dates,
                        datasets: [
                            {
                                data: this.state.fb_data
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={0.4*height}
                    yAxisLabel=""
                    yAxisSuffix=" Hr(s)"
                    yAxisInterval={1} // optional, defaults to 1
                    fromZero={true}
                    chartConfig={{
                        backgroundColor: 'rgb(39, 76, 119)',
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: 'rgb(86, 227, 159)',
                        backgroundGradientTo: 'rgb(39, 76, 119)',
                        decimalPlaces: 0, // optional, defaults to 2dp
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
                        marginTop: 0,
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                 />
                 <View >
                 <Button
                 title=""
                 color="white"
                 />
                 </View>
                 <View style={styles.fixToText}>
                <Button title='Sleepwalking:' color={'rgb(39, 76, 119)'} style={{align: 'center',justifyContent: 'center'}}/> 
                 </View>
                 <View style={{justifyContent:'flex-end'}}>
                 <Text style={{color: 'rgb(86, 227, 159)', fontWeight: 'bold', flexWrap:'nowrap', fontSize: 17, marginBottom:4}}>      You have sleepwalked at 2022-05-15 02:37</Text>
                 </View>
                 <View >
                 <Button
                 title=""
                 color="white"
                 />
                 </View>
                 <View style={styles.fixToText}>
                <Button title='Contacts:' color={'rgb(39, 76, 119)'} style={{align: 'center',justifyContent: 'center'}}/> 
                 </View>
                 <View style={{justifyContent:'flex-end'}}>
                 <Text style={styles.kleurGroen}>      The contact list is empty.</Text>
                 </View>
                </View>

                <View style={[styles.child, {backgroundColor: 'white'}]}>
                <Text style={{color: 'rgb(39, 76, 119)', fontWeight: 'bold', fontSize: 20}}>Heartrate</Text>
                 <LineChart
                    data={{
                        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sa"],
                        datasets: [
                            {
                                data: [0, 0, 52, 0, 0, 0, 0]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={0.4*height}
                    yAxisLabel=""
                    yAxisSuffix="Bps"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: 'rgb(86, 227, 159)',
                        backgroundGradientTo: 'rgb(39, 76, 119)',
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
                        
                        marginTop: 0,
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                 />
                <View >
                 <Button
                 title=""
                 color="white"
                 />
                 </View>
                 <View style={styles.fixToText}>
                <Button title='Heartrate:' color={'rgb(39, 76, 119)'} style={{align: 'center',justifyContent: 'center'}}/> 
                 </View>
                 <View style={{justifyContent:'flex-end'}}>
                 <Text style={styles.kleurGroen}>      Last detected = 86 Bps</Text>
                 </View>
                 <View >
                 <Button
                 title=""
                 color="white"
                 />
                 </View>
                 <View style={styles.fixToText}>
                <Button title='Contacts:' color={'rgb(39, 76, 119)'} style={{align: 'center',justifyContent: 'center'}}/> 
                 </View>
                 <View style={{justifyContent:'flex-end'}}>
                 <Text style={styles.kleurGroen}>      The contact list is empty.</Text>
                 </View>
                </View>

                <View style={[styles.child, { backgroundColor: 'white' }]}>
                    <Text style={{color: 'rgb(39, 76, 119)', fontWeight: 'bold', fontSize: 20}}>Contact list</Text>
                    <View >
                    <Button
                     title=""
                    color="white"
                     />
                 </View>
                    <View style={{ justifyContent: 'flex-start'}}>
                    <Button title='Add contacts' color={'rgb(39, 76, 119)'} style={{align: 'center',justifyContent: 'center'}} /> 
                    </View>
                </View>
                
                <View style={[styles.child, { backgroundColor: 'white' }]}>
                <Text style={{color: 'rgb(39, 76, 119)', fontWeight: 'bold', fontSize: 20}}>About</Text>
                <View >
                    <Button
                     title=""
                    color="white"
                     />
                 </View>
                <View>
                    <Text style={styles.kleurGroen}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                </View>
                </View>
                
                </SwiperFlatList>                
            </View>
        );
    }
}

function convert_data(data) {
    return Math.round((data / 60) * 100) / 100;
}

const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
    kleurBlue: {
        color: 'rgb(39, 76, 119)',
        fontWeight: 'bold',
        alignItems:'center'
    },

    kleurGroen: {
        color: 'rgb(86, 227, 159)',
        fontWeight: 'bold',
        fontSize: 20,
    },
    container: { flex: 1, backgroundColor: 'white' },
    child: { width, height:0.4*height },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 20,
      },
});
