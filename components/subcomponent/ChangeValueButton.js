import React, {Component} from 'react';
import {
     View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../global';

export default class ChangeValueButton extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            currentValue : props.currentValue,
            productId : props.productId,
        }
       
    }

    componentWillReceiveProps(nextProps){
        
    }

    decreaseProduct(){
        global.decreaseProduct();
        // console.log('here in change  value component '+ productId);
    }

    increaseProduct(){
        global.increaseProduct();
        // console.log('here in change  value component '+ productId);

    }

    render(){
        const {body, container,left, right,increase, decrease, currentValue, backgroundValue} = styles;
        return (
            // body
            <View style={body}>
                {/* container */}
                <View style={container}>
                    {/* decrease button */}
                    <View style={left}>
                        <TouchableOpacity onPress={()=>{this.decreaseProduct()}}>
                            <View style={decrease}>
                                <Ionicons name="ios-remove" size={24} color='red'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* current value */}
                    <View style={currentValue}>
                        <View style={backgroundValue}>
                            <Text>{this.state.currentValue}</Text>
                        </View>
                    </View>
                    {/* increase button */}
                    <View style={right}>
                        <TouchableOpacity onPress={()=>{this.increaseProduct()}}>
                            <View style={increase}>
                                <Ionicons name="ios-add" size={24} color='blue'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> 
            </View>
        );
    }
}
const styles = StyleSheet.create({
    body:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container:{
        flex: 1,
        height: 26,
        flexDirection: 'row',
        // borderWidth: 1,
        alignItems: 'center',
    },
    left:{
        flex: 1,
        // borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    decrease:{
        width: 24,
        height: 24,
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentValue:{
        flex: 1,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    right:{
        flex: 1,
        // borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    increase:{
        width: 24,
        height: 24,
        borderRadius: 15,
        borderColor: 'blue',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    }
});