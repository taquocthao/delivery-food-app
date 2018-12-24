import React, {Component} from 'react';
import {
    View, ActivityIndicator,
} from 'react-native';
import MapView from '../map_components/mapview';
export default class IncomingView extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            address: '...',
        }
    }

    getAddress = (addr) => {
        this.setState({address : addr});
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <MapView address={this.getAddress}></MapView>
            </View>
        );
    }
}
