import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';

export default class Map extends Component{
  constructor(props){
    super(props);
    this.state = {
      latitude : 0,
      longitude: 0,
    };
  }

  componentDidMount(){
    // lấy vĩ độ và kinh độ từ thiết bị
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude : position.coords.latitude,
          longitude :  position.coords.longitude,
        })
      }, 
      (err) => console.log(err), 
      {enableHighAccuracy : true, timeout: 2000, maximumAge: 1000
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