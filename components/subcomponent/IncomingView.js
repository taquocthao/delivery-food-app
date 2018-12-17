import React, {Component} from 'react';
import {
    AsyncStorage, View, ActivityIndicator, StyleSheet, Text,
} from 'react-native';
import MapView from '../map_components/mapview';
export default class IncomingView extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            address: '...',
            isLoadding : true,
        }
    }

    componentDidMount(){
        this.setState({isLoadding : false});
    }

    getAddress = (addr) => {
        this.setState({address : addr});
    }


    render(){
        if(this.state.isLoadding){
            return (
                <ActivityIndicator />
            );
        }
        return(
            <View style={{flex: 1}}>
                <MapView address={this.getAddress}></MapView>
            </View>
        );
    }
}
