import React, {Component} from 'react';
import {
    View, Text, Picker, StyleSheet, TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FoodList from './FoodList.js';

export default class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
            language : '',
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <Ionicons  name='ios-search' size={32}/>
                        <TextInput 
                            style={styles.inputSearch}
                            placeholder="Tìm kiếm"
                        ></TextInput>
                    </View>
                </View>
                <View style={styles.body}>
                    <FoodList />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        flex: 1,

    },
    body:{
        flex : 2,
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    footer:{

    },
    search:{
        flexDirection: 'row',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 7,
        alignItems: 'center',
        margin: 8,
        paddingLeft: 15,
        zIndex: 1,
        position: "absolute",
        backgroundColor: '#fff',
    },
    inputSearch:{
        flex: 1,
        marginLeft: 5,
    },
});