import React, {Component} from 'react';
import {
    View, Text, StyleSheet, AsyncStorage, TouchableOpacity, Alert, FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import component
import ModalListProductInCart from '../modals/ModalListProductInCart';
import MapView from '../map_components/mapview';
import global from '../global';
// import url goi món
import {URL_ORDER} from '../Url'


export default class Order extends Component{

    constructor(props){
        super(props);
        // this.itemRef = firebaseApp.database();
        this.state = {
            userInfor : {},
            cartArray: [],
            price: 0,
            shippingPrice : 0,
            freeShipping: 0,
            totalPrice : 0,
            visibleShopCart : false,
            address : 'null',
        };
        //
        global.sendAddress = this.getAddress.bind(this);
    }

    componentDidMount(){
        // lấy thông tin user
        this.getUserInfor().then(user => this.setState({userInfor : user}));
        // lấy giỏ hàng
        this.getCart()
        .then(items => this.setState({cartArray : items}))
        .then(() => this.getPrice())
        .then(() => this.calculatePrice());
    }

    componentWillReceiveProps(nextProps){
        this.setState({visibleShopCart : false});
    }

    async getUserInfor(){
        try{
            const user = await AsyncStorage.getItem('userToken');
            if(user !== null){
                const userObject = JSON.parse(user);
                // console.log(userObject.name);
                return userObject;
            }
        } catch(err){
            console.log(err);
        }
        return null;
    }

    async getCart(){
        try{
            const items = await AsyncStorage.getItem("@cart");
            if(items !== null){
                return JSON.parse(items);
            }
        } catch(err){
            console.log(err);
        }
        return null;
    }

    getPrice(){
        var total = 0;
        this.state.cartArray.forEach(element => {
            total += element.quantity*element.product.salePrice;
        });
        this.setState({price : total})
    }

    calculatePrice(){
        var total = (this.state.price + this.state.shippingPrice) - this.state.freeShipping;
        this.setState({totalPrice : total});
        // console.log('đã tính tổng');
    }

    showShoppingCart(){
        this.setState({visibleShopCart: true});
    }

    // nhận địa chỉ từ mapview gửi qua cho state address
    // getAddress = (addr) => {
    //     this.setState({address : addr});
    // }

    getAddress(addr){
        this.setState({address : addr});
        // console.log(addr);
    }

    // gọi món lên hệ thống
    orderToServer(){
        var invoice_details = {
            p : this.state.cartArray.map(e => {return ({id : e.product.id, quantity : e.quantity})}),
            id_user : this.state.userInfor.id,
            address : this.state.address
        };

        // this.itemRef.ref("Invoices").push(invoice_details);
        fetch(URL_ORDER, 
            {
                method: 'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(invoice_details)
            }
        ).then((response) => 
            {
                // xóa cart
                global.deleteCart();
                // trở về menu
                this.props.navigation.goBack();
                global.reloadInvoices();
                // console.log("goi mon " +response);
            }
        )
        // .then(resposeJson => {
        //     console.log(resposeJson);
        //     // if(resposeJson.id_invoice <= 0){ //failure
        //     //     Alert.alert("Gọi món thất bại");
        //     // } else { 
        //         //gọi món thành công
        //         // xóa cart
        //         global.deleteCart();
        //         // trở về menu
        //         this.props.navigation.goBack();
        //         // global.reloadInvoices();
                
        //     // }
        // })
        .catch(err => console.log(err));
    }

    render(){
        const {
            userInfor,cartArray, price, shippingPrice, freeShipping, totalPrice,
        } = this.state;
        const {
            container,header, body, footer, headerTop, headerBottom,
            headerLeft, headerRight, bodyTop, bodyBottom, row, footerTop, footerBottom,
             box, footerBox, buttonOrder,rowProduct, numberId, rowProductRight, hidden, showMore,
        } = styles;
        return (
            <View style={container}>
                {/* header */}
                <View style={header}>
                    {/* header top */}
                    <View style={headerTop}>
                        {/* header left */}
                        <View style={headerLeft}>
                            <MapView />
                            {/* address={this.getAddress} */}
                        </View>
                        {/* header right */}
                        <View style={headerRight}>
                            <Text style={{color: 'gray', fontSize: 14}}>Giao đến</Text>
                            <Text style={{fontWeight: 'bold'}}>
                                {userInfor.name} - {userInfor.phonenumber}
                            </Text>
                            <Text>{this.state.address}</Text>
                        </View>
                    </View>
                    {/* header bottom */}
                    <View style={headerBottom}>
                        <Text>Hôm nay - {new Date().toDateString()}</Text>
                    </View>
                </View>
                {/* body */}
                <View style={body}>
                    {/* body top */}
                    <View style={bodyTop}>                  
{/* list  */}
                        {
                            // mỗi phần tử trong mảng sẽ được render ra một view
                            cartArray.map((element, index) => {
                            if(index <= 2){
                                return (
                                    <View key={element.product.id.toString()} style={rowProduct}>
                                        {/* số thứ tự */}
                                        <View style={numberId}>
                                            <Text style={{color: '#fff',}}>{index + 1}</Text>                                        
                                        </View>
                                        {/* tên sản phẩm, giá tiền */}
                                        <View style={rowProductRight}>
                                            <Text>{element.product.name}</Text>
                                            <Text>{element.product.salePrice * element.quantity}đ</Text>
                                        </View>
                                    </View>
                                );
                            }
                        })}
                        {/* nếu sản phẩm trong giỏ hàng vượt qua 3 sản phẩm, 
                        thì hiển thị một link kết để xem các sản phẩm còn lại  */}
                        <View style={cartArray.length <= 3 ? hidden : showMore}>
                            <TouchableOpacity onPress={() => {this.showShoppingCart()}}> 
                                <Text style={{color : 'blue'}}>{cartArray.length - 3} phần khác...</Text>
                            </TouchableOpacity>
                        </View>
{/* end list */}
                    </View>
                    {/* body bottom */}
                    <View style={bodyBottom}>
                        {/* row */}
                        {/* hiển thị số sản phẩm trong giỏ hàng */}
                        <View style={row}>
                            <Text>Tổng {cartArray.length} phần</Text>
                            <Text>{price}</Text>
                        </View >
                        {/* row */}
                        {/* hiển thị phí vận chuyển */}
                        <View style={row}>
                            <Text>Phí vận chuyển: {11.5} km</Text>
                            <Text>{shippingPrice}</Text>
                        </View>
                        {/* row */}
                        <View style={row}>
                            <Text>Miễn phí vận chuyển:</Text>
                            <Text>{freeShipping}</Text>
                        </View>
                        {/* row */}
                        {/* hiển thị tổng tiền đã qua tính phí */}
                        <View style={row}>
                            <Text style={{fontWeight: 'bold'}}>Tổng cộng:</Text>
                            <Text style={{fontWeight: 'bold'}}>{totalPrice}</Text>
                        </View>
                    </View>
                </View>
                {/* footer */}
                <View style={footer}>
                    {/* footer top */}
                    <View style={footerTop}>
                        <View style={box}>
                            <Ionicons name="md-create" size={24} color="gray"/>
                            <Text>Ghi chú</Text>
                        </View>
                        <View style={box}>
                            <Ionicons name="ios-pricetag" size={24} color="gray"/>
                            <Text>Mã khuyến mãi</Text>
                        </View>
                        <View style={box}>
                            <Ionicons name="ios-information-circle" size={24} color="gray"/>
                            <Text>No invoice</Text>
                        </View>
                    </View>
                    {/* footer bottom */}
                    <View style={footerBottom}>
                        <View style={footerBox}>
                            <Text style={{color: '#fff'}}>{cartArray.length} Phần</Text>
                        </View>
                        <View style={footerBox}>
                            <TouchableOpacity onPress={() => this.orderToServer()}>
                                <View style={buttonOrder}>
                                    <Text style={{color: '#fff'}}>Đặt hàng </Text> 
                                    <Ionicons name="ios-arrow-round-forward" size={24} color='#fff'/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={footerBox}>
                            <Text style={{color: '#fff'}}>{totalPrice}</Text>
                        </View>
                    </View>
                </View>
                {/* modal hiển thị sản phẩm trong giỏ hàng */}
                <ModalListProductInCart visibleShopCart={this.state.visibleShopCart}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    header:{
        flex: 2,
        flexDirection: 'column',
        // borderWidth: 1,
        padding: 10,
    },
    headerTop:{
        flex: 4,
        flexDirection: 'row',
    },
    headerLeft:{
        flex: 1,
        borderWidth: 1,
        marginRight: 8,
    },
    headerRight:{
        flex: 2,
        flexDirection: 'column',
    },
    headerBottom:{
        flex: 1,
        justifyContent: 'center',
        // borderWidth: 1,
    },
    body:{
        flex: 3.5,
        // borderWidth: 1,
        padding: 10,
    },
    bodyTop:{
        flex: 1.525,
        // borderWidth : 1,
    },
    rowProduct:{
        flex: 1,
        height: 50,
        flexDirection: 'row',
        margin: 5,
        
    },
    numberId:{
        flex: 1,
        backgroundColor: '#088DCE',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 4,
    },
    rowProductRight:{
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
        
    },
    hidden:{
        display: 'none',
    },
    showMore:{
        display: 'flex',
        flex: 1,
    },
    bodyBottom:{
        flex: 1.525,
    },
    row:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
    ,
    footer:{
        flex: 1.5,
        // borderWidth: 1,

    },
    footerTop:{
        flex:2,
        flexDirection: 'row',
    },
    box:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 0.5,
        borderColor: 'gray',
    },
    footerBottom:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: "#088DCE",
    },
    footerBox:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonOrder:{
        flexDirection: 'row',
    }

});