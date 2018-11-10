import React, {Component} from 'react';
import {
    View, Text, Picker, StyleSheet, TextInput, Dimensions, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FoodList from './FoodList.js';
import {URL_PRODUCT_CATEGORY} from '../Url';

export default class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataProductCategory: [],
            item : '',
        }
    }

    componentDidMount(){
        const url = URL_PRODUCT_CATEGORY;
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataProductCategory : responseJson,
            });
        })
        .catch((err) => {console.error(err)})
    }

    onValueChangePicker(itemValue, itemIndex){
        this.setState({
            item : itemValue,
        }, function(){
            // Alert.alert("" + itemValue );
            // sau khi thay doi loai thuc pham

        });
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
                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={this.state.item}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => {this.onValueChangePicker(itemValue, itemIndex)} }>
                            < Picker.Item label="Tất cả" value={0}/>
                            {this.state.dataProductCategory.map(
                                (item, key) => (< Picker.Item label={item.name} value={item.id} key={key}/>)
                                )}
                        </Picker>
                    </View>
                </View>

                <View style={styles.body}>
                    <FoodList categoryId={this.state.item === 0 ? '' : this.state.item}/>
                </View>
            </View>
        );
    }
}
const widthDemesion = Dimensions.get('window').width - 30;

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
        flex: 1,
        flexDirection: 'row',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 7,
        alignItems: 'center',
        margin: 8,
        paddingLeft: 15,
        backgroundColor: '#fff',
    },
    inputSearch:{
        flex: 1,
        marginLeft: 5,
    },
    pickerBox:{
        flex: 2,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        margin: 8,
    },
    picker:{
        width: widthDemesion,
    }
});