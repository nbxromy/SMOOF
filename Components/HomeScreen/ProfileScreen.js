/* @flow */

import React, { Component, useState } from 'react';
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
/*
const accountSid = 'AC95c5b3c0cbd87299cd0901b3dd3c0cd7'; 
const authToken = '[AuthToken]'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'You are sleepwalking!',  
         messagingServiceSid: 'MG333b65da943d99f480f640a81d994367',      
         to: '+31623642091' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
*/


export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        // const [isShowingText, setIsShowingText] = useState(true);

        this.state = {
            fb_sleepdata: [],
            fb_data: [],
            fb_dates: [],
            fb_hrdata: [],
            fb_hrdates: [],
            sleepwalktime: []
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
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]
        );
    }

    get_fitbit_data = () => {
        const access_tokenHD = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzhDUFoiLCJzdWIiOiI5V1ZaOEciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJ3aHIgd3BybyB3bnV0IHdzbGUgd3dlaSB3c29jIHdhY3Qgd3NldCB3b3h5IHdyZXMgd2xvYyIsImV4cCI6MTY1Nzc4OTM5MiwiaWF0IjoxNjU3MjI0MDYzfQ.evMpeTIIiL_TFjPILuOxcwFhfV1vVMilk3FRbWYQWPU"
        var now = new Date().toISOString().slice(0, 10);
        var lastweek = new Date();
        var dd = '22' //String(lastweek.getDate()-7).padStart(2, '0');
        var mm = '06'//String(lastweek.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = lastweek.getFullYear();
        
        lastweek = yyyy + '-' + mm + '-' + dd;

        fetch('https://api.fitbit.com/1/user/-/hrv/date/2022-06-15/2022-06-22.json',{
            method: "GET",
            headers: {"Authorization": "Bearer " + access_tokenHD}
        })
        .then(res => { return res.json() })
        .then(res => {
            var hrdata = []
            var hrdates = []
            for( let i = 0; i < res['hrv'].length; i++){
                hrdata[i] = res['hrv'][i]['value']['deepRmssd']
                var date = new Date(res['hrv'][i]['dateTime'])
                hrdates[i] = date.toDateString().slice(0,10);
            }
            this.setState({ fb_hrdata: hrdata})
            this.setState({ fb_hrdates: hrdates})
        })

        fetch('https://api.fitbit.com/1.2/user/-/sleep/date/2022-06-15/2022-06-22.json', {
            method: "GET",
            headers: { "Authorization": "Bearer " + access_tokenHD }
        })
        .then(res => { return res.json() })
        .then(res => {
            var data = []
            var dates = []
            for( let i = 0; i < res['sleep'].length; i++){
                data[i] = Math.round((res['sleep'][(res['sleep'].length-1)-i]['minutesAsleep']/60)*100)/100;
                var date = new Date(res['sleep'][(res['sleep'].length-1)-i]['dateOfSleep'])
                dates[i] = date.toDateString().slice(0,10);
            }
            this.setState({ fb_sleepdata: res['sleep'][0]})
            this.setState({ fb_data: data })
            this.setState({ fb_dates: dates })
        })
    }
    
    componentDidMount() {
        this.get_fitbit_data();
        this.get_sleepwalk_data();
    }

    get_sleepwalk_data() {
        console.log("---  fetching data from fitbit api  ---")
        var sleepwalkdata = fetch('http://139.162.157.126/sleepwalk', {
            method: "GET",
            headers: {},
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("--- inside responseData ---");
                console.log('response object:', responseData);
                this.setState({ sleepwalkData: responseData[responseData.length-1]['date'] })

            }).catch((error) => console.error(error));
        console.log("logging sleepwalkdata variable");
        return sleepwalkdata
    }
    


    render() {
        var sleepWalkData = this.get_sleepwalk_data;
        // console.log("--- logging data inside render function ---");
        // console.log(sleepWalkData);
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
                 <Text style={{color: 'rgb(86, 227, 159)', fontWeight: 'bold', flexWrap:'nowrap', fontSize: 17, marginBottom:4}}>      You have sleepwalked at {this.state.sleepwalkData}</Text>
                 </View>
                 <View >
                 <Button
                 title=""
                 color="white"
                 onPress={this.messages}
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
                        <Text style={{ color: 'rgb(39, 76, 119)', fontWeight: 'bold', fontSize: 20 }}>Heartrate</Text>
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
                            height={0.4 * height}
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
                        <br></br>
                        <View style={styles.fixToText}>
                            <Button title='Heartrate:' color={'rgb(39, 76, 119)'} style={{ align: 'center', justifyContent: 'center' }} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={styles.kleurGroen}>      Last detected = 86 Bps</Text>
                        </View>
                        <br></br>
                        <View style={styles.fixToText}>
                            <Button title='Contacts:' color={'rgb(39, 76, 119)'} style={{ align: 'center', justifyContent: 'center' }} />
                        </View>
                        <View style={{ justifyContent: 'flex-end' }}>
                            <Text style={styles.kleurGroen}>      The contact list is empty.</Text>
                        </View>
                    </View>

                    <View style={[styles.child, { backgroundColor: 'white' }]}>
                        <Text style={{ color: 'rgb(39, 76, 119)', fontWeight: 'bold', fontSize: 20 }}>Contact list</Text>
                        <br></br>
                        <View style={{ justifyContent: 'flex-start' }}>
                            <Button title='Add contacts' color={'rgb(39, 76, 119)'} style={{ align: 'center', justifyContent: 'center' }} />
                        </View>
                    </View>

                    <View style={[styles.child, { backgroundColor: 'white' }]}>
                        <Text style={{ color: 'rgb(39, 76, 119)', fontWeight: 'bold', fontSize: 20 }}>About SleepWeller</Text>
                        <br></br>
                        <View>
                            <Text style={styles.kleurGroen}>Hi, welcome to the SleepWeller mobile app. This mobile application is designed to wake you up when you start sleepwalking during the night. The application is linked with your personal fitbit to keep track of signs used to determine weither you are sleepwalking or not. If sleepwalking is detected, the fitbit will try to wake you up by sounding an alarm. The fitbit will then also save the current data and time to our database, so you can have insight into what happened the next day in this very app.
                                <br></br><br></br>
                                Stay safe and sleep well!!
                            </Text>
                        </View>
                    </View>

                </SwiperFlatList>
            </View>
        );
    }
}

const { width,height } = Dimensions.get('window');

const styles = StyleSheet.create({
    kleurBlue: {
        color: 'rgb(39, 76, 119)',
        fontWeight: 'bold',
        alignItems: 'center'
    },

    kleurGroen: {
        color: 'rgb(86, 227, 159)',
        fontWeight: 'bold',
        fontSize: 20,
    },
    container: { flex: 1, backgroundColor: 'white' },
    child: { width, height: 0.4 * height },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 20,
    },
});
