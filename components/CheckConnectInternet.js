import React, {Component} from 'react';
import {
    View, NetInfo, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';

import { createSwitchNavigator } from 'react-navigation';
import App from '../App';

 class CheckConnect extends Component{
    constructor(props){
        super(props);
        this.state = {
            isConnectIntenter : false,
        }
    }

    componentDidMount(){
        this.tryConnectInternet();
    }

    tryConnectInternet(){
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            if(connectionInfo.type == 'none' || connectionInfo.type == 'unknown'){
                this.setState({isConnectIntenter : false});
            } else {
                this.setState({isConnectIntenter : true}, function(){
                    this.props.navigation.navigate("app");
                });
            }
          });
    }

    render(){
        if(this.state.isConnectIntenter){
            return (
                <View style={styles.container}> 
                    <ActivityIndicator />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={{fontSize: 24}}>No connected Internet!</Text>
                    <TouchableOpacity onPress={() => this.tryConnectInternet()}>
                        <Text style={{fontWeight : "bold"}}>Try again</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

export default createSwitchNavigator(
    {
        checkconnect : CheckConnect,
        app : App,
    },
    {
        initialRouteName : "checkconnect",
        headerMode: 'none',
        navigationOptions:{
            header : null,
        },
    }
);


const styles = StyleSheet.create({
    container :{
        flex : 1,
        alignItems : "center",
        justifyContent: "center",
    }
});