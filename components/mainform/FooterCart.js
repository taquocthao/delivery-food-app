import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../global';


export default class FooterCart extends Component{

    constructor(props){
        super(props);
        this.state = {
            totalPrice : 0,
            products: [],
            count : 0,
            visible : false,
            cartArray: [],
        }
        global.addProductToCart = this.addProductToCart.bind(this);
    }

    componentDidMount(){
       this.retrieveProducts('products');
    }

    componentWillReceiveProps(nextProps){
      
    }

    addProductToCart(product){
        this.setState({
            cartArray : this.state.cartArray.concat(product),
            visible : true,
        });
    }

    async retrieveProducts(key){
        try{
            const value = await AsyncStorage.getItem(key);
            if(value !== null){
                const items = JSON.parse(value);
                this.setState({
                    products: items,
                    visible: true,
                }, function(){
                    this.setState({count : this.state.products.length});
                    return true;
                });
            } 
        } catch(err){
            Alert.alert("Lỗi khi lấy dữ liệu", "Lỗi " + err);
        }
        return false;
    }

    async clearProducts(key){
        try{
            await AsyncStorage.removeItem(key);
            return true;
        } catch(err){
            console.log(err);
        }
        return false;
    }

    stepToOrder(){
        if(this.clearProducts('products')){
            Alert.alert("xoa thanh cong");
        }
    }

    showShoppingCart(){
        // Alert.alert("test");
        
    }

    render(){
        return (
            <View style={styles.body}>
                <View style={styles.footerLeft}>
                    <TouchableOpacity onPress={()=> {this.showShoppingCart()}}>
                        <View style={styles.cartInfo}>
                            <View style={styles.cart}>
                                <Ionicons name="ios-cart" size={32} color='#fff'
                                style={{position: 'relative'}}/>
                                <Text style={this.state.visible == true ? styles.badge : styles.hiddenBadge}>
                                    {this.state.cartArray.length}
                                </Text>
                            </View>
                            <Text style={styles.textPrice}>{this.state.totalPrice}đ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.footerRight}>
                    <TouchableOpacity onPress={()=>{this.stepToOrder()}}>
                        <View style={styles.button}>
                            <Text style={{color: '#fff'}}>Giao hàng</Text>
                            <Ionicons name="ios-arrow-round-forward" size={24} color='#fff'/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    body:{
        flex: 1,
        flexDirection: 'row',
    },
    footerLeft:{
        flex: 2,
        backgroundColor: '#000',
        opacity: 0.8,
        justifyContent: "center",
    },
    cartInfo:{
        flexDirection: 'row',
        paddingLeft: 8,
    },
    cart:{
        flexDirection: 'row',
    },
    badge:{
        position: 'absolute',
        right: -2,
        top: -4,
        backgroundColor: '#ff9800',
        borderWidth: 0.5,
        borderColor: '#fff',
        paddingRight: 2,
        paddingLeft: 2,
        borderRadius: 5,
        fontSize: 10,

    },
    hiddenBadge:{
        display: 'none',
    },
    textPrice:{
        fontSize: 16,
        color: '#fff',
        marginLeft: 15,
    },
    footerRight:{
        flex: 1,
        backgroundColor: "#088DCE",
        justifyContent: "center",
    },
    button:{
        flexDirection: 'row',
        justifyContent: "center",
    },
});