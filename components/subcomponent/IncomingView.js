import React, {Component} from 'react';
import {
    View,
} from 'react-native';

import MapIncoming from '../map_components/MapIncoming';

export default class IncomingView extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            address: '...',
        };
    }

    render(){
        return(
            <View style={{flex: 1}}>
                <MapIncoming />
            </View>
        );
    }
}

