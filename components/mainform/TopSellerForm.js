import React, {Component} from 'react';
import {
    View, Text, FlatList, StyleSheet, Image, Dimensions, ActivityIndicator,
} from 'react-native';

import {URL_TOPSELLER} from '../Url';

export default class TopSeller extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
        }
    }

    componentDidMount(){
        // lấy danh sách 10 sản phẩm được đặt hàng nhiều nhất 
        const url = URL_TOPSELLER;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ 
                    dataSource: responseJson,
                })
            })
            .catch((error) => {console.error(error)})
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
        return (
            <FlatList
                data={this.state.dataSource}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                numColumns={numberColumns}
            />
        );
    }
}

const numberColumns = 3;
const size = Dimensions.get('window').width/numberColumns;

const styles = StyleSheet.create({
    containerBox: {
        width: size,
        height: size,
    },
    item: {
        flex: 1,
        margin: 5,
        // backgroundColor: 'lightblue',
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
        fontSize: 10,
        textAlign: 'center',
    }
});
