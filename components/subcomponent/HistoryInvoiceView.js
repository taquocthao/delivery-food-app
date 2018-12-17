import React, {Component} from 'react';
import {
    View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, FlatList, AsyncStorage, Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {URL_ORDER_HISTORY} from '../Url';
import ModalViewHistoryOrdered from '../modals/ModalViewHistoryOrdered';

export default class HistoryInvoice extends Component{
    constructor(props){
        super(props);
        this.state = {
            invoices : [],
            userInfor : {},
            isLoading : true,
            idInvoice : 0,
        }
    }

    componentDidMount(){
        // this.getUserInfor().then((user) => {
        //     this.setState({userInfor : user});
        // })
        // .then(()=>{
        //     const urlGetInvoices = URL_ORDER_HISTORY + 5;
        //     this.fetchInvoiceHistory(urlGetInvoices);
        // })
        // .then(()=> this.setState({isLoading: false}));
        var myJson = JSON.stringify([
            {
                "status":"Ordered", 
                "id_invoice":1,
                "invoice_date":2018,
                "Adress":"Go Vap", 
                "id_employee":1,
                "id_user":null, 
                "total" :74,
                "detailProducts":[
                    {
                        "id_product":7,
                        "quantity":4
                    }
                ]
            },
            {
                "status":"Ordered", 
                "id_invoice":2,
                "invoice_date":2018,
                "Adress":"Quan 4", 
                "id_employee":1,
                "id_user":null, 
                "total" :74,
                "detailProducts":[
                    {
                        "id_product":7,
                        "quantity":4
                    },
                    {
                        "id_product":7,
                        "quantity":4
                    }
                ]
            },
            {
                "status":"Ordered", 
                "id_invoice":2,
                "invoice_date":2018,
                "Adress":"Quan 4", 
                "id_employee":1,
                "id_user":null, 
                "total" :74,
                "detailProducts":[
                    {
                        "id_product":7,
                        "quantity":4
                    },
                    {
                        "id_product":7,
                        "quantity":4
                    }
                ]
            },
        ]);
        this.setState({invoices : JSON.parse(myJson), isLoading: false});
        // console.log(myJson);
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

    fetchInvoiceHistory(url){
        fetch(url)
        .then((res) => res.json())
        .then((resJson) => {
            // if(resJson !== null){ // trả về đúng dạng 
                console.log(JSON.stringify(resJson.invoices));
            // } else { // khac dang
            //     Alert.alert("lỗi kết nối", "Vui lòng thử lại");
            // }
            this.setState({invoices : resJson.invoices});
        })
    }

    goToDetail(idInvoice){
        this.setState({idInvoice : idInvoice});
    }

    keyExtractor = (item, index) => item.id_invoice.toString();

    renderItem = ({item}) => {
        return (
            <View style={styles.card}>
                {/* left card */}
                <View style={styles.leftCard}>
                    <Text style={{fontWeight: "bold"}}>{item.invoice_date}</Text>
                    <Text>{item.Adress}</Text>
                </View>
                {/* right box */}
                <View style={styles.rightCard}>
                    <TouchableOpacity onPress={() => this.goToDetail(item.id_invoice)}>
                        <View style={styles.buttonViewDetails}>
                            <Text style={{color: "blue", marginRight: 5,}}>{item.detailProducts.length} phần</Text>
                            <Ionicons name="ios-arrow-forward" size={12} color="blue"/>
                        </View>
                    </TouchableOpacity>
                    
                </View>
            </View>
        );
    }

    render(){
        const {container, header, body,} = styles;

        if(this.state.isLoading){
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return(
            // container
            <View style={container}>
                {/* header */}
                <View style={header}>
                    <Text>{this.state.invoices.length} Hóa đơn</Text>
                </View>
                {/* body */}
                <View style={body}>
                    <FlatList 
                        data={this.state.invoices}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                    />
                </View>
                <ModalViewHistoryOrdered idInvoice={this.state.idInvoice}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        borderBottomWidth: 0.5,
        padding: 5,
    },
    header:{
        flex: 1,
    },
    body:{
        flex: 7,
    },
    card:{
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        padding: 10,
    },
    rightCard:{
        flex: 1,
        // borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonViewDetails:{
        // backgroundColor: 'yellow',
        flexDirection: "row",
        alignItems: 'center',
    },
    leftCard:{
        flex: 4,
        flexDirection: 'column',
    }

});