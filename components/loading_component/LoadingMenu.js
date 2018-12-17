import React, {Component} from 'react';
import {
    View, ActivityIndicator, StyleSheet
} from 'react-native';

export default class LoadingMenu extends Component{
    constructor(props){
        super(props);
        this.goToMenu();
    }

    goToMenu(){
        this.props.navigation.navigate("Menu");
    }


    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator/>           
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });