import React, {Component} from 'react';
import {
    FlatList, Image, Text, TouchableOpacity, 
    StyleSheet, View, Alert, Modal, Dimensions, AsyncStorage,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {URL_PRODUCTS} from '../Url';

import ModalAddFood from './ModalAddFood';
import FooterCart from './FooterCart';
import global from '../global';

export default class FoodList extends Component{

    constructor(props){
        super(props);
        this.state = {
            products : [],
            productsStoring: [],
            product: {},
            categoryId : props.categoryId,
            modalVisible : false,
            // cartVisible : false,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({ 
            modalVisible : false,
        });
        const url = URL_PRODUCTS + nextProps.categoryId;
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                products : responseJson,
            });
        })
        .catch((err) => {console.error(err)})
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.box}>
                {/* <TouchableOpacity onPress={() => {this.pressItem({item})}} > */}
                    <View style={styles.imageBackground}>
                        <Image source={{uri : item.image}} style={styles.image}/>
                    </View>
                    <View style={styles.detailsFoodView}>
                        <TouchableOpacity onPress={() => {this.pressItem({item})}}>
                            <View style={styles.leftDetails}>
                                <Text >{item.name}</Text>
                                <Text style={styles.textPrice}>{item.price}</Text>
                                <View style={styles.iconCart}>
                                    <Ionicons name='ios-cart' size={12}/>
                                    <Text style={styles.text}>{item.timesBooked}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        
                        <View style={styles.rightDetails}>
                            <TouchableOpacity onPress={() => this.addToCart({item})}>
                                <View style={styles.buttonAdd}>
                                    <Ionicons name='ios-add' size={24}></Ionicons>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                {/* </TouchableOpacity> */}
                
            </View>
        );
    }

    
    

    // lưu dữ liệu các món đã chọn
    async storingProducts(key, item){
        try{
            //kiểm món ăn đã dược gọi trước đó hay chưa
            var existsProducts = await AsyncStorage.getItem('products');
            
            if(existsProducts === null){ // chưa có sản phẩm trong data
                this.state.productsStoring.push(item);
            } else{ // đã có sản phẩm trong data
                // kiểm tra sản phẩm mới có trùng với sản phẩm trong data hay không
                const exitsItem =  this.state.productsStoring.find(element => element.id === item.id);
               
                if(exitsItem != undefined){
                    console.log("da trung");
                    return false;
                } else {
                    this.state.productsStoring.push(item);
                }
            }
            await AsyncStorage.setItem(key, JSON.stringify(this.state.productsStoring));
            return true;
            
        } catch(err){
            Alert.alert("Lỗi lưu dữ liệu", "lỗi -> " + err);
        }
        return false;
    }


    addToCart({item}){
        // Alert.alert("add", "you have choosen item " + item.name);
        
        // this.storingProducts('products', item)
        //     .then((value) => {
        //         this.setState({ 
        //             cartVisible: true,
        //             modalVisible: false,  })
        //     }).catch((err) => {console.log(err)});

        global.addProductToCart(item);

    }

    pressItem({item}){

        this.setState({
            product : item,
            modalVisible : true,
        });
    }

    keyExtractor = (item, index) => item.id.toString();

    render(){
        return (
            <View>
                {/* modal add food, hidden default */}
                <ModalAddFood 
                    modalVisible={this.state.modalVisible} 
                    item={this.state.product == null ? '' : JSON.stringify(this.state.product)}
                    
                 />
                {/* list food */}
                <FlatList 
                    data={this.state.products}
                    extraData={this.state}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    />
                 
                {/* <View style={this.state.cartVisible == true ? styles.footer : styles.hide}>
                    <FooterCart visible={this.state.cartVisible}/>
                </View> */}
                 
            </View>
            
        );
    }

}

const widthDevice = Dimensions.get('window').width;

const styles = StyleSheet.create({

    // footer:{
    //     position: 'absolute',
    //     bottom:0,
    //     height: 50,
    //     width: widthDevice,
        
    // },
    // hide:{
    //     display: "none",
    // },

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
    },

});