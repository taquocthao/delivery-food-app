import React, {Component} from 'react';
import {
    Modal, View, Text, TouchableOpacity, Image, StyleSheet, AsyncStorage, FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ShoppingCart extends Component{

    constructor(props){
        super(props);
        this.state = {
            visibleShopCart : false,
            cartArray : [],
        };
    }

    componentDidMount(){
        this.getCart().then(items => this.setState({cartArray : items}));
        // console.log("here");
        console.log(this.state.cartArray);
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

    componentWillReceiveProps(nextProps){
        if(nextProps.visibleShopCart === true){
            this.getCart().then(items => this.setState({
                cartArray : items,
                visibleShopCart : nextProps.visibleShopCart
            }));
            this.setState({visibleShopCart : nextProps.visibleShopCart});
        }
    }

    setModalVisible(visible){
        this.setState({visibleShopCart : visible});
    }

    renderItem = ({item})=>{
        const {row, imageBackground, detailBackground, image} = styles;
        return (
            <View style={row} key={item.product.id.toString()}>
                <View style={imageBackground}>
                    <Image source={{uri : item.product.image}} style={image} />
                </View>
                <View style={detailBackground}>
                    <Text style={{fontWeight: 'bold'}}>{item.product.name}</Text>
                    <Text >
                        {item.product.salePrice} x {item.quantity} = {item.product.salePrice * item.quantity}
                    </Text>
                </View>
            </View>
        );
    }

    keyExtractor = (item, index) => item.product.id.toString();

    render(){
        const {container, header, body ,text} = styles;
        return (
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.state.visibleShopCart}
                onRequestClose={ () => {
                    // Alert.alert('modal have been closed');
                    this.setState({visibleShopCart: false,})
                }}
             >
                <View style={container}>
                        {/* header */}
                        <View style={header}>
                            <TouchableOpacity onPress={()=>{this.setModalVisible(false)}}>
                                <Ionicons name='ios-close' size={32} color="white"/>
                            </TouchableOpacity>
                            <Text style={text}>Giỏ hàng</Text>
                            <TouchableOpacity onPress={()=>{this.setModalVisible(false)}}>
                                <Text style={text}>Xong</Text>
                            </TouchableOpacity>
                        </View>
                        {/* body */}
                        <View style={body}>
                            <FlatList
                                data={this.state.cartArray}
                                renderItem={this.renderItem}
                                keyExtractor={this.keyExtractor}
                            />
                        </View>        
                </View>
             </Modal>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },  
    header:{
        flex: 1,
        // height: 50,
        flexDirection: 'row',
        justifyContent : 'space-between',
        // borderWidth:  1,
        alignItems: 'center',
        backgroundColor: '#088DCE',
        paddingRight: 15,
        paddingLeft: 15,
    },
    body:{
        flex: 8,
        // borderWidth: 1,
    },
    
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },

    row:{
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        paddingTop: 2,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
    },
    imageBackground:{
        flex: 1,
        padding: 2,
    },
    image:{
        height: 100,
        flex: 1,
    },
    detailBackground:{
        flex: 3,
        flexDirection: 'column',
        marginLeft: 5,
    }

});