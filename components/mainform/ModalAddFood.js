import React, {Component} from 'react';
import {
    View, StyleSheet, Modal, Text, Dimensions, 
    TouchableOpacity, Image, TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ModalAddFood extends Component{

    constructor(props){
        super(props);
        this.state = {
            modalVisible : props.modalVisible,
            item : JSON.parse(props.item),
            count : 1,
            totalPrice: '0',
        };
        
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

    decreaseCount(){
        var value = this.state.count;
        if(value <= 1){
            this.setState({count : 1});
        } else{
            this.setState({count : this.state.count - 1});  
        }
    }

    increaseCount(){
        this.setState({count : this.state.count + 1});
    }



    render(){
        return (
           
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={ () => {
                    Alert.alert("modal has been closed");
                }}>
                {/* background modal */}
                <View style={styles.modal}>
                    {/* background content modal */}
                    <View style={styles.contentModal}>
                        {/* header content modal */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={ () => {
                                    this.setModalVisible(!this.state.modalVisible);} }>
                                <View style={styles.closeButton}>
                                    <Ionicons name='ios-close' size={32} color="white"/>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.text}>Thêm món</Text>
                        </View>
                        {/* body cotent modal */}
                        <View style={styles.body}>
                            <View style={styles.detailBox}>
                                {/* left column */}
                                <View style={styles.left}>
                                    <Image source={{uri: this.state.item.image}} style={styles.image}></Image>
                                </View>
                                {/* right column */}
                                <View style={styles.right}>
                                    <View style={styles.details}>
                                        <Text >{this.state.item.name}</Text>
                                        <Text style={styles.textPrice}>{this.state.item.price}</Text>
                                        <View style={styles.iconCart}>
                                            <Ionicons name='ios-cart' size={12}/>
                                            <Text style={styles.textBooked}>{this.state.item.timesBooked}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.choiceNumber}>
                                        <View style={styles.choiceBox}>
                                            <View style={styles.box}>
                                                <TouchableOpacity onPress={() => {this.decreaseCount()}}>
                                                    <View style={styles.decreaseButton}>
                                                        <Ionicons name='ios-remove' size={24}></Ionicons>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.box}>
                                                <Text style={styles.textCount}>{this.state.count}</Text>
                                            </View>
                                            <View style={styles.box}>
                                                <TouchableOpacity onPress={() => {this.increaseCount()}}>
                                                    <View style={styles.increaseButton}>
                                                        <Ionicons name='ios-add' size={24}></Ionicons>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.noteBox}>
                                <TextInput placeholder="Thêm ghi chú"></TextInput>
                            </View>
                        </View>

                        <View style={styles.footer}>
                            <View>
                                <TouchableOpacity onPress={ () => {
                                    this.setModalVisible(!this.state.modalVisible);}}>
                                    <View style={styles.addButton}>
                                        <Text style={styles.text}>Thêm vào giỏ</Text>
                                    </View>
                                    
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.text}>{this.state.item.price*this.state.count}</Text>
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
        backgroundColor: "#00000080",
        justifyContent: 'center',
        padding: 20,
    },
    contentModal:{
        backgroundColor: "#ffffff",
        height: heightContenModal,
        justifyContent: 'space-between',
    },
    header:{
        backgroundColor: "#0288ff",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    closeButton:{
        color: '#fff',
        padding: 15,
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
    left:{
        flex: 1,
        marginRight: 5,
    },
    image:{
        flex: 1,
        margin: 2,
    },
    right:{
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
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
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