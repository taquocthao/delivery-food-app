import React, {Component} from 'react';
import {
    View, NetInfo, Text,
} from 'react-native';

export default class CheckConnect extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            // console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            if(connectionInfo.type == 'none' || connectionInfo.type == 'unknown'){
                console.log("disconnected");
            } else {
                // this.props.navigation.navigate("App");
                console.log("connected");
            }
          });
    }

    render(){
        return(
            <View>
                <Text>check internet</Text>
            </View>
        );
    }
}