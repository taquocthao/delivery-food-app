import React, {Component} from 'react';
import {
    Modal, View, Text, TouchableOpacity, Alert, StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FooterCart from './FooterCart';
import ListProduct from '../subcomponent/ListProductInCart';
import global from '../global';

export default class ShoppingCart extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible : false,
            isClearCart : false,
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.visible != false){
            this.setState({modalVisible : true});
        }
    }

    setModalVisible(visible){
        this.setState({modalVisible : visible});
    }

    deleteCart(){
        global.deleteCart();
        this.setState({isClearCart:true,})
    }

    render(){
        const {container, header, body, footer ,text, button } = styles;
        return (
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={ () => {
                    // Alert.alert('modal have been closed');
                    this.setState({modalVisible: false,})
                }}
             >
                <View style={container}>
                        {/* header */}
                        <View style={header}>
                            <TouchableOpacity onPress={()=>{this.setModalVisible(false)}}>
                                <Ionicons name='ios-close' size={32} color="white"/>
                            </TouchableOpacity>
                            <Text style={text}>Giỏ hàng</Text>
                            <TouchableOpacity onPress={()=>{this.deleteCart()}}>
                                <Text style={text}>Xóa</Text>
                            </TouchableOpacity>
                        </View>
                        {/* body */}
                        <View style={body}>
                            <ListProduct isClearCart={this.state.isClearCart}></ListProduct>
                        </View>
                        {/* footer */}
                        <View style={footer}>
                            <TouchableOpacity>
                                <View style={button}>
                                    <Text style={text}>Giao hàng</Text>
                                    <Ionicons name='ios-arrow-round-forward' size={24} color='#fff'/>
                                </View>
                            
                            </TouchableOpacity>
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
    footer:{
        flex: 1,
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#088DCE',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
    button:{
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 15,
    }
});