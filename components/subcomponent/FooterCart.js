import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../global';
// import các component
import retrieveProducts from '../data/GetProducts';
import saveProducts from '../data/SaveProducts';
import ModalShoppingCart from '../modals/ModalShoppingCart';

export default class FooterCart extends Component{

    constructor(props){
        super(props);
        this.state = {
            totalPrice : 0,
            products: [],
            count : 0,
            visible : false,
            cartArray: [],
            // retrieveArray: '',
            modalVisible: false,
        }
        global.addProductToCart = this.addProductToCart.bind(this);
        global.decreaseProduct = this.decreaseProduct.bind(this);
        global.increaseProduct = this.increaseProduct.bind(this);
        global.deleteCart = this.deleteCart.bind(this);
    }

    componentDidMount(){
       retrieveProducts()
       .then(items => {
            if(items !== null){
                // console.log("visible : true");
                this.setState({
                    cartArray : JSON.parse(items),
                    visible : true
                });
            }
       });
    }

    componentWillReceiveProps(){
        this.setState({
            modalVisible: false,
        });
    }

    // lưu sản phẩm đã chọn vào data
    addProductToCart(product){
        //kiểm tra sản phẩm tồn tại trong giỏ hàng
        const existsProduct = this.state.cartArray.findIndex(e => e.product.id == product.id);
        console.log(existsProduct);
        if(existsProduct === -1){
            // console.log('Chua ton tai');
            this.setState({
                cartArray : this.state.cartArray.concat({product: product, quantity: 1}),
                visible : true,
                modalVisible: false,
            }, function(){
                saveProducts(this.state.cartArray);
            });
        }else{
            // console.log("ton tai");
            this.state.cartArray[existsProduct] = {
                product: product, quantity : this.state.cartArray[existsProduct].quantity + 1};
            this.setState({
                cartArray : this.state.cartArray,
                modalVisible: false,
                visible : true,
            }, function(){
                saveProducts(this.state.cartArray);
            });
        }
    }

    increaseProduct(productId){
        
        const newCart = this.state.cartArray.map(item => {
            if(item.product.id !== productId)
                return item;
            return {product: item.product, quantity : item.quantity + 1};
        });
        this.setState({
            cartArray : newCart,
        }, function(){
            saveProducts(this.state.cartArray);
        });
    }

    decreaseProduct(productId){
        const newCart = this.state.cartArray.map(item => {
            if(item.product.id !== productId)
                return item;
            return {product: item.product, quantity : item.quantity - 1};
        });
        this.setState({
            cartArray : newCart,
        }, function(){
            saveProducts(this.state.cartArray);
        });
    }
    
    deleteCart(){
        this.clearCart().then(
            this.setState({
                visible : false,
                count : 0,
                cartArray : [], 
            })
        );
    }

    async clearCart(){
        try{
            await AsyncStorage.removeItem("@cart");
            
            return true;
        } catch(err){
            console.log(err);
        }
        return false;
    }

    stepToOrder(){
        
    }

    showShoppingCart(){
        // Alert.alert("test");
        this.setState({modalVisible: true});
    }

    render(){
        return (
            <View style={{flex: 1}}>
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
                <ModalShoppingCart visible={this.state.modalVisible}/>
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