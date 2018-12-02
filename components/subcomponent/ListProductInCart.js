import React, {Component} from 'react';
import {
    FlatList, View, Text, StyleSheet,
} from 'react-native';

import retrieveProducts from '../data/GetProducts';
import ChangeValueButton from '../subcomponent/IncreaseDecreaseButton';
// import global from '../global';

export default class ListProduct extends Component{

    constructor(props){
        super(props);
        this.state = {
            products : [],
            isClearCart : props.isClearCart,
        }
        
    }

    componentDidMount(){
        retrieveProducts()
        .then( items => {
            if(items !== null){
                this.setState({products : JSON.parse(items)});
            }
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isClearCart){
            retrieveProducts()
                .then(items => this.setState({products : JSON.parse(items)}));
        }
    }

    renderItem = ({item}) => {
        const {container, left, right ,title, price} = styles;
        return (
            // container
            <View style={container}>
                {/* left view */}
                <View style={left}>
                    <Text style={title}>{item.product.name}</Text>
                    <Text style={price}>{item.product.price} x {item.quantity} = {item.product.price * item.quantity}</Text>
                </View>
                {/* right view */}
                <View style={right}>
                    <ChangeValueButton productId={item.product.id} currentValue={item.quantity} />
                </View>
            </View>
        );
    }

    keyExtractor = (item, index) => item.product.id.toString();

    render(){
        return (
            <FlatList 
                data={this.state.products}
                extraData={this.state}
                keyExtractor = {this.keyExtractor}
                renderItem={this.renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray',
    },
    left:{
        flex: 2,
        flexDirection: "column",
    },
    right:{
        flex: 1,
    },
    title:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    price:{
        fontSize: 12,
    }
});