import React, {Component} from 'react';
import {
    FlatList, Image, Text, TouchableOpacity, StyleSheet, View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {URL_PRODUCTS} from '../Url';



export default class FoodList extends Component{

    constructor(props){
        super(props);
        this.state = {
            product : [],
            categoryId : props.categoryId,
        }
    }

    // componentDidMount(){
    //     // .../products/{categoryId}
    //     const url = URL_PRODUCTS;
    //     fetch(url)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //         this.setState({
    //             product : responseJson,
    //         });
    //     })
    //     .catch((err) => {console.error(err)})
    // }


    componentWillReceiveProps(nextProps){
        // this.setState({ categoryId : nextProps.categoryId });
        const url = URL_PRODUCTS + nextProps.categoryId;
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                product : responseJson,
            });
        })
        .catch((err) => {console.error(err)})
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.box}>
                <View style={styles.imageBackground}>
                    <Image source={{uri : item.image}} style={styles.image}/>
                </View>
                <View style={styles.detailsFoodView}>
                    <View style={styles.leftDetails}>
                        <Text >{item.name}</Text>
                        <Text style={styles.textPrice}>{item.price}</Text>
                        <View style={styles.iconCart}>
                            <Ionicons name='ios-cart' size={12}/>
                            <Text style={styles.text}>{item.timesBooked}</Text>
                        </View>
                    </View>
                    <View style={styles.rightDetails}>
                        <TouchableOpacity>
                            <View style={styles.buttonAdd}>
                                <Ionicons name='ios-add' size={24}></Ionicons>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    keyExtractor = (item, index) => item.id.toString();

    render(){
        return (
            <FlatList 
                data={this.state.product}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
            />
        );
    }

}

const styles = StyleSheet.create({
    box:{
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        padding: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
    },
    imageBackground:{
        flex: 1,
        padding: 2,
    },
    image:{
        flex: 1,
    },
    detailsFoodView:{
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        alignItems: 'center',
    },
    leftDetails:{
        flexDirection: 'column',
    },
    textname:{

    },
    textPrice:{
        color: 'gray',
        fontSize: 11,
    },
    iconCart: {
        flexDirection:'row',
        alignItems: 'center',
    },
    text:{
        color: 'gray',
        fontSize: 11,
        marginLeft: 5,
    },
    rightDetails:{

    },
    buttonAdd:{
        backgroundColor: 'powderblue',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }


});