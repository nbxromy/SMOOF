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
                {text: 'OK', onPress: () => console.log('OK Pressed')},  
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
                            labels: this.state.fb_hrdates,
                            datasets: [
                            {
                                data: this.state.fb_hrdata
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
                 <Text style={styles.kleurGroen}>     Last detected = {this.state.fb_hrdata[6]} Bps</Text>
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
