import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, Image
} from 'react-native';

import Swiper from 'react-native-swiper';

const img1 = 'https://images.foody.vn/biz_banner/foody-ccccccccc-636752983510234947.jpg';
const img2 = 'https://images.foody.vn/biz_banner/foody-pop-636739830185075130.jpg';
const img3 = 'https://images.foody.vn/biz_banner/foody-675x355-636733769446426915.jpg';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
  },
  slide2: {
    flex: 1,
    
  },
  slide3: {
    flex: 1,
  
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
  }
})

export default class SwiperScreen extends Component {
  render(){
    return (
      <Swiper style={styles.wrapper} 
          showsButtons={true}
          autoplay={true}>
        <View style={styles.slide1}>
          <Image source={{uri: img1}} style={styles.image}></Image>
        </View>
        <View style={styles.slide2}>
          <Image source={{uri: img2}} style={styles.image}></Image>
        </View>
        <View style={styles.slide3}>
          <Image source={{uri: img3}} style={styles.image}></Image>
        </View>
      </Swiper>
    );
  }
}