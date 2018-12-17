import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, AsyncStorage,
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
            modalShoppingCartVisible: false,
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
                
                this.setState({
                    cartArray : JSON.parse(items),
                    visible : true
                });
            }
       })
       .then(() => this.ChangeTotalPrice());
    }

    componentWillReceiveProps(){
        this.setState({
            modalShoppingCartVisible: false,
        });
    }

    // lưu sản phẩm đã chọn vào data
    addProductToCart(product, newQuantity){
        //kiểm tra sản phẩm tồn tại trong giỏ hàng
        const existsProduct = this.state.cartArray.findIndex(e => e.product.id == product.id);
        // console.log(existsProduct);
        if(existsProduct === -1){ // nếu sản phẩm chưa được gọi trước đó
            this.setState({
                cartArray : this.state.cartArray.concat({product: product, quantity: newQuantity}),
                visible : true,
                modalShoppingCartVisible: false,
            }, function(){
                saveProducts(this.state.cartArray).then(()=>this.ChangeTotalPrice());
            });
        }else{ // nếu sản phẩm đã tồn tại trong giỏ hàng
            // thay đổi số lượng đối với sản phẩm đó
            this.state.cartArray[existsProduct] = {
                product: product, quantity : this.state.cartArray[existsProduct].quantity + newQuantity};
            // cập nhật lại mảng, ngăn modal giỏ hàng hiển thị thông qua state : modalShoppingCartVisible
            // hiển thị số lượng sản phẩm trong giỏ hàng thông qua state : visible
            this.setState({
                cartArray : this.state.cartArray,
                modalShoppingCartVisible: false,
                visible : true,
            }, function(){
                // sau khi thay đổi mảng, gọi đến hàm saveProducts để lưu các sản phẩm xuống file local
                saveProducts(this.state.cartArray).then(()=>this.ChangeTotalPrice());
            });
        }
    }

    // tăng số lượng món ăn từ component giỏ hàng (ModalShopingCart)
    increaseProduct(productId){
        
        const newCart = this.state.cartArray.map(item => {
            if(item.product.id !== productId)
                return item;
            return {product: item.product, quantity : item.quantity + 1};
        });
        this.setState({
            cartArray : newCart,
        }, function(){
            saveProducts(this.state.cartArray).then(()=>this.ChangeTotalPrice());
        });
    }

    // giảm số lượng món ăn từ component giỏ hàng (ModalShopingCart)
    decreaseProduct(productId){
        const newCart = this.state.cartArray.map(item => {
            if(item.product.id !== productId)
                return item;
            else {
                if(item.quantity <= 1){
                    console.log('< 1');
                    return {product: item.product, quantity : 1};
                } else {
                    //  console.log(' > 1');
                    return {product: item.product, quantity : item.quantity - 1};
                 }
            }
            
        });
        this.setState({
            cartArray : newCart,
        }, function(){
            saveProducts(this.state.cartArray).then(()=>this.ChangeTotalPrice());
        });
    }
    
    deleteCart(){
        this.clearCart().then(
            this.setState({
                visible : false,
                count : 0,
                cartArray : [], 
                totalPrice : 0,
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

    ChangeTotalPrice() {
        var total = 0;
        this.state.cartArray.forEach(element => {
            total += element.quantity*element.product.salePrice;
        });
        this.setState({totalPrice : total});
    }

    stepToOrder(){
        // this.props.navigation.navigate('Order');
        if(this.state.cartArray.length > 0){
            global.gotoCart();
        }
    }

    showShoppingCart(){
        // Alert.alert("test");
        this.setState({modalShoppingCartVisible: true});
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
                <ModalShoppingCart visible={this.state.modalShoppingCartVisible} />
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