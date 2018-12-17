import React, {Component} from 'react';
import {
    View, StyleSheet, Text, Modal, FlatList, ActivityIndicator,
} from 'react-native';
import {URL_PRODUCTS_BY_INVOICE_ID} from '../Url';

export default class HistoryOrdered extends Component{

    constructor(props){
        super(props);
        this.state = {
            visibleModalViewHistory : false,
            products: [],
            isLoading : true,
        }
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.idInvoice != null){
            const url = URL_PRODUCTS_BY_INVOICE_ID + nextProps.idInvoice;
            this.setState({visibleModalViewHistory: true, isLoading : true,}, function(){
                fetch(url).then((res) => res.json())
                .then((resJson) => {
                    this.setState({products : resJson});
                })
                .then(() => this.setState({isLoading:false}));
            });
        }
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
    
    keyExtractor = (item) => item.id.toString();

    render() {
        const {container, header, body, centerHeader, topBody, bottomBody,} = styles;
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
                transparent={true}
                visible={this.state.visibleModalViewHistory}
                onRequestClose={ () => {
                    this.setState({visibleShopCart: false,})
                }}
            >
                <View style={container}>
                    {/* header */}
                    <View style={header}>
                        {/* left header */}
                        <View style={{flex : 1}}>
                            <TouchableOpacity onPress={()=>{this.setModalVisible(false)}}>
                                <Ionicons name='ios-close' size={32} color="white"/>
                            </TouchableOpacity>
                        </View>
                        {/* center */}
                        <View  style={centerHeader}>
                            <Text>Thông tin hóa đơn</Text>
                        </View>
                        {/* right header */}
                        <View style={{flex : 1}}></View>
                    </View>
                    {/* body: list products */}
                    <View style={body}>
                        {/* top body */}
                        <View style={topBody}>
                            <Text>{4} phần - {83000}đ</Text>
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
            </Modal>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header:{
        flex: 1,
        backgroundColor: "#088DCE",
        borderWidth: 1,
    },
    centerHeader:{
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    body:{
        flex: 7,
        borderWidth: 1,
    },
    topBody:{
        flex: 1,
        backgroundColor: '#fafad2',
    },
    bottomBody:{
        flex : 6,
    }

});