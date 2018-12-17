import React, {Component} from 'react';
import {
    View, StyleSheet, Modal, Text, Dimensions, 
    TouchableOpacity, Image, TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../global';
// import các component
import ChangeValueButton from '../subcomponent/ChangeValueButton';
export default class ModalAddFood extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible : props.modalVisible,
            item : JSON.parse(props.item),
            count : 1,
            totalPrice: '0',
        };
        global.increase = this.increaseProduct.bind(this);
        global.decrease = this.decreaseProduct.bind(this);

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            modalVisible: nextProps.modalVisible,
            item : JSON.parse(nextProps.item),
        });
    }

    setModalVisible(visible){
        this.setState({
            modalVisible : visible,
            count : 1,
        });
    }

    decreaseProduct(){
        var value = this.state.count;
        if(value <= 1){
            this.setState({count : 1});
        } else{
            this.setState({count : this.state.count - 1});  
        }
        // console.log('decrease');
    }

    increaseProduct(){
        this.setState({count : this.state.count + 1});
        // console.log('increase');
    }

    addProductToCart(item, quantity){
        global.addProductToCart(item, quantity);
        this.setState({modalVisible : false});
    }


    render(){
        const {modal, contentModal, header, closeButton, text,
             body, detailBox, leftDetail, rightDetail, details, textPrice, 
             iconCart, textBooked, choiceNumber, noteBox, footer, addButton, } = styles;
        return (   
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={ () => {
                    // Alert.alert("modal has been closed");
                    this.setState({modalVisible : false});
                }}>
                {/* background modal */}
                <View style={modal}>
                    {/* background content modal */}
                    <View style={contentModal}>
                        {/* header content modal */}
                        <View style={header}>
                            <TouchableOpacity onPress={ () => {
                                    // đóng modal
                                    this.setModalVisible(!this.state.modalVisible);} }>
                                <View style={closeButton}>
                                    <Ionicons name='ios-close' size={32} color="white"/>
                                </View>
                            </TouchableOpacity>
                            <Text style={text}>Thêm món</Text>
                            
                        </View>
                        {/* body cotent modal */}
                        <View style={body}>
                            <View style={detailBox}>
                                {/* left column */}
                                <View style={leftDetail}>
                                    <Image source={{uri: this.state.item.image}} style={styles.image}></Image>
                                </View>
                                {/* right column */}
                                <View style={rightDetail}>
                                    <View style={details}>
                                        <Text >{this.state.item.name}</Text>
                                        <Text style={textPrice}>{this.state.item.price}</Text>
                                        <View style={iconCart}>
                                            <Ionicons name='ios-cart' size={12}/>
                                            <Text style={textBooked}>{this.state.item.timesBooked}</Text>
                                        </View>
                                    </View>
                                    <View style={choiceNumber}>
                                        {/* component change value */}
                                        <ChangeValueButton productId={this.state.item.id} 
                                        currentValue={this.state.count}/>
                                    </View>
                                </View>
                            </View>
                            <View style={noteBox}>
                                <TextInput placeholder="Thêm ghi chú"></TextInput>
                            </View>
                        </View>

                        <View style={footer}>
                            <View>
                                <TouchableOpacity onPress={ () => {
                                    // thêm món
                                    this.addProductToCart(this.state.item, this.state.count);
                                    }}>
                                    <View style={addButton}>
                                        <Text style={text}>Thêm vào giỏ</Text>
                                    </View>
                                    
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={text}>{this.state.item.salePrice*this.state.count}</Text>
                            </View>
                            
                        </View>
                        
                    </View>
                </View>
            </Modal>
            
        );
    }
}

const heightDevice = Dimensions.get('window').height;
const heightContenModal = heightDevice - 100;

const styles = StyleSheet.create({
    modal:{
        flex: 1,
        // backgroundColor: "#00000080",
        justifyContent: 'center',
        padding: 20,
    },
    contentModal:{
        backgroundColor: "#ffffff",
        height: heightContenModal,
        // justifyContent: 'space-between',
    },
    header:{
        backgroundColor: "#0288ff",
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeButton:{
        margin: 15,
    },
    body:{
        backgroundColor: '#fff',
        flex: 1,
    },
    detailBox: {
        flexDirection: 'row',
        flex: 1,
        margin: 5,
    },
    noteBox:{
        flex: 4,
        margin: 5,
    },
    leftDetail:{
        flex: 1,
        marginRight: 5,
    },
    image:{
        flex: 1,
        margin: 2,
    },
    rightDetail:{
        flex: 3,
        flexDirection: 'row',
    },
    details:{
        flexDirection: 'column',
        flex: 2,
    },
    textPrice:{
        color: 'gray',
        fontSize: 11,
    },
    iconCart:{
        flexDirection:'row',
        alignItems: 'center',
    },
    textBooked:{
        color: 'gray',
        fontSize: 11,
        marginLeft: 5,
    },
    choiceNumber:{
        flex: 1,
    },
    choiceBox:{
        flexDirection: 'row',
        flex: 1,
        height: 32,
        alignItems: 'center',
    },
    box:{
        flex: 1,
        margin: 3,
    },  
    decreaseButton:{
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#B14040',
        alignItems: "center",
    },
    textCount:{
        borderRadius: 5,
        backgroundColor: '#ddd',
        textAlign: 'center',
    },
    increaseButton:{
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: '#5B7997',
        alignItems: 'center',
    },

    footer:{
        backgroundColor: "#49739d",
        flexDirection: 'row',
        padding: 15,
        justifyContent: "space-between",
    },
    addButton:{
        
    },
    text:{
        color: '#fff',
    }

});