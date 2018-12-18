import React, {Component} from 'react';
import {
    View, StyleSheet, Text, Modal, FlatList, ActivityIndicator,
     TouchableOpacity, Image
} from 'react-native';
import {URL_PRODUCTS_BY_INVOICE_ID} from '../Url';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class HistoryOrdered extends Component{

    constructor(props){
        super(props);
        this.state = {
            visibleModalViewHistory : false,
            idInvoice : 0,
            totalPrice : 0,
            products: [],
            isLoading: false,
        }
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.visible){
            const url = URL_PRODUCTS_BY_INVOICE_ID + nextProps.idInvoice;
            this.setState({
                visibleModalViewHistory: true,
                isLoading : true,
                totalPrice : nextProps.totalPrice,
            }, function(){
                fetch(url).then((res) => res.json())
                .then((resJson) => {
                    this.setState({products : resJson});
                })
                .then(() => this.setState({isLoading:false}));
            });
            // this.setState({visibleModalViewHistory : nextProps.visible});
            // console.log(nextProps.idInvoice);
        }
    }

    setModalVisible(visible){
        this.setState({visibleModalViewHistory : visible});
    }

    renderItem = ({item})=>{
        const {card, imageBackground, detailBackground, image} = styles;
        return (
            <View style={card}>
                <View style={imageBackground}>
                    <Image source={{uri : item.image}} style={image} />
                </View>
                <View style={detailBackground}>
                    <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                    <Text >
                        {item.salePrice} x {item.quantity} = {item.salePrice * item.quantity}
                    </Text>
                </View>
            </View>
        );
    }
    
    keyExtractor = (item, index) => item.id_product.toString();

    render() {
        const {wrapper ,container, header, body, leftHeader, centerHeader, topBody, bottomBody,} = styles;
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, alignItems : 'center', justifyContent: 'center'}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return(
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.state.visibleModalViewHistory}
                onRequestClose={ () => {
                    this.setState({visibleModalViewHistory: false,})
                }}
            >
                <View style={wrapper}>
                    <View style={container}>
                        {/* header */}
                        <View style={header}>
                            {/* left header */}
                            <View style={leftHeader}>
                                <TouchableOpacity onPress={()=>{this.setModalVisible(false)}}>
                                    <Ionicons name='ios-close' size={32} color="white"/>
                                </TouchableOpacity>
                            </View>
                            {/* center */}
                            <View  style={centerHeader}>
                                <Text style={{color: 'white'}}>Thông tin hóa đơn</Text>
                            </View>
                            {/* right header */}
                            <View style={{flex : 1}}></View>
                        </View>
                        {/* body: list products */}
                        <View style={body}>
                            {/* top body */}
                            <View style={topBody}>
                                <Text>{this.state.products.length} phần - {this.state.totalPrice}đ</Text>
                            </View>
                            {/* list products */}
                            <View style={bottomBody}>
                                <FlatList
                                    data={this.state.products}
                                    renderItem={this.renderItem}
                                    keyExtractor={this.keyExtractor}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

}
const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        padding: 20,
        backgroundColor: "#00000080",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header:{
        flex: 0.5,
        flexDirection: 'row',
        backgroundColor: "#088DCE",
        // borderWidth: 1,
    },
    leftHeader:{
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 8,
        // borderWidth: 1,
    },
    centerHeader:{
        flex: 2,
        alignItems: "center",
        justifyContent: 'center',
    },
    body:{
        flex: 7,
        // borderWidth: 1,
    },
    topBody:{
        flex: 0.5,
        backgroundColor: '#fafad2',
        justifyContent: 'center',
        paddingLeft: 8,
    },
    bottomBody:{
        flex : 6.5,
       
    },

    // style for item product
    card:{
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