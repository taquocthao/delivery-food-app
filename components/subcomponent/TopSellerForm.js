import React, {Component} from 'react';
import {
    View, Text, FlatList, StyleSheet, Image, Dimensions, ActivityIndicator,
} from 'react-native';

import {URL_TOPSELLER} from '../Url';



// var numberColumns = Math.round(Dimensions.get('screen').width/150);

export default class TopSeller extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            // orientation : 'portrait',
            // numberColumns : 0,
        }
    }

    componentDidMount(){
        // lấy danh sách 15 sản phẩm được đặt hàng nhiều nhất 
        fetch(URL_TOPSELLER)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ 
                    dataSource: responseJson,
                    isLoading: false,
                    // numberColumns : Math.round(Dimensions.get("window").width/150),
                })
            })
            .catch((error) => {console.error(error)});
            
    }

    onLayout(){
        // const {width, height } = Dimensions.get('screen');
        // if(width > height) {
        //     this.setState({numberColumns : Math.round(Dimensions.get('screen').width/150)});
        //     // console.log("landscape" + width);
        //     // numberColumns = Math.round(Dimensions.get('screen').width/150);
        //     // console.log(numberColumns);
        // } else {
        //     // this.setState({numberColumns : Math.round(Dimensions.get('screen').width/150)});
        //     // console.log("portrait" + width);
        //     // numberColumns = Math.round(Dimensions.get('screen').width/150);
        //     // console.log(numberColumns);
        // }
    }
    
    renderItem = ({item}) => {
        return (
            <View style={styles.containerBox}>
                <View style={styles.item}>
                    <View style={styles.headerCard}>
                        <Image source={{uri: item.image}} style={{flex: 1}}/>
                    </View>
                    <View style={styles.footerCard}>
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                </View>
            </View>
        );
    }

    keyExtractor = (item, index) => item.id;

    render(){
        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
           
            <FlatList
                data={this.state.dataSource}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                numColumns={numberColumns}
            />
  
        );
    }
}
const numberColumns = Math.round(Dimensions.get('screen').width/150);
const size = Dimensions.get('screen').width/numberColumns;

const styles = StyleSheet.create({
    container:{ // style cho ActivityIndicator
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBox: {
        width: size,
        height: size,
        // flex: 1,
    },
    item: {
        flex: 1,
        margin: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5,
    },
    headerCard: {
        flex: 3,
    },
    footerCard: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 11,
        textAlign: 'center',
    }
});
