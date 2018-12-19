import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView from 'react-native-maps';
// import Geocoder from 'react-native-geocoder';

import global from '../global';

const API_KEY = "AIzaSyBxOdxMzUrHxdK9ooxbs4VuJGyFb7P3dag";
export default class Map extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      latitude : 0,
      longitude: 0,
      address: '',
    }
  }

  componentDidMount(){
    // lấy vĩ độ và kinh độ từ thiết bị
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude : position.coords.latitude,
          longitude :  position.coords.longitude,
        }, function(){ // dùng ki độ vĩ độ vừa lấy được để lấy địa chỉ
            this.getAddress(this.state.latitude, this.state.longitude, API_KEY)
        });
      }, 
      (err) => console.log(err), 
      {enableHighAccuracy : true, timeout: 5000, maximumAge: 1000
      });
  }

  

  getAddress(latitude, longitude, api_key){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude 
    + '&key='+ api_key)
    .then((response) => response.json())
    .then((respionseJson) => {
        this.setState({address : respionseJson.results[0].formatted_address}, function(){
          // console.log(this.state.address);
          //property của Mapview
          this.props.address(this.state.address);
        });
        // console.log(respionseJson.results.formatted_address);
    });
  }

  render(){
      return(
          <View style={styles.container}>
            <MapView
              style={styles.map}
              showsUserLocation
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
            </MapView>
        </View>
      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });