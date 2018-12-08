import React, {Component} from 'react';
import {
    View, Text, Picker, StyleSheet, TextInput, Dimensions, Alert, TouchableOpacity,
} from 'react-native';

import {createStackNavigator} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

// import các component
import FoodList from '../subcomponent/FoodList';
import {URL_PRODUCT_CATEGORY} from '../Url';
import FooterCart from '../subcomponent/FooterCart';
import OrderScreen from '../subcomponent/OrderComponent';
import global from '../global';


class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
            dataProductCategory: [],
            item : '',
        };
        global.gotoCart = this.gotoCart.bind(this);
    }

    // sau khi khởi tạo component, sẽ gọi đến hàm did mount.
    // trong hàm này, dữ liệu sẽ được lấy từ api và đổ vào state dataProductCategory.
    componentDidMount(){
        const url = URL_PRODUCT_CATEGORY;
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                dataProductCategory : responseJson,
            });
        })
        .catch((err) => {console.error(err)})
    }

    // hàm được gọi khi giá trị loại sản phẩm được thay đổi
    onValueChangePicker(itemValue, itemIndex){
        this.setState({
            item : itemValue,
        });
    }

    gotoCart(){
        this.props.navigation.navigate('Order');        
    }

    render(){
        return (
            // View tổng quát
            <View style={styles.container}>
                {/* phần đầu của giao diện menu.
                    gồm : bộ tìm kiếm, picker loại sản phẩm
                */}
                <View style={styles.header}>
                    <View style={styles.search}>
                        <Ionicons  name='ios-search' size={32}/>
                        <TextInput 
                            style={styles.inputSearch}
                            placeholder="Tìm kiếm"
                        ></TextInput>
                    </View>
                    <View style={styles.pickerBox}>
                        <Picker
                            selectedValue={this.state.item}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => {this.onValueChangePicker(itemValue, itemIndex)} }>
                            < Picker.Item label="Tất cả" value=""/>
                            {this.state.dataProductCategory.map(
                                (item, key) => (< Picker.Item label={item.name} value={item.id} key={key}/>)
                                )}
                        </Picker>
                    </View>
                </View>
                {/* phần thân: hiển thị danh sách thực phẩm của cửa hàng,
                    nó sẽ hiển thị dựa vào loại sản phẩm mà khách hàng lựa chọn.
                    mặc định sẽ hiển thị "Tất cả"
                */}
                <View style={styles.body}>
                    <FoodList categoryId={this.state.item === "" ? '' : this.state.item}/>
                </View>
                {/* footer: hiển thị giỏ hàng và nút giao hàng */}
                <View style={styles.footer}>
                    <FooterCart />
                </View>
            </View>
        );
    }
}

const CreateStack = createStackNavigator(
    {
        Menu : Menu,
        Order : OrderScreen,
    },
    {
        headerMode: 'none',
        navigationOptions:{
            header : null,
        },
    }
);

export default CreateStack;

const widthDemesion = Dimensions.get('window').width - 30;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        flex: 1,
    },
    body:{
        flex : 3,
        borderWidth: 0.5,
        borderColor: 'gray'
    },
    footer:{
        
        flex: 0.4,
    },
    search:{
        flex: 1,
        flexDirection: 'row',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 7,
        alignItems: 'center',
        margin: 8,
        paddingLeft: 15,
        backgroundColor: '#fff',
    },
    inputSearch:{
        flex: 1,
        marginLeft: 5,
    },
    pickerBox:{
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        margin: 8,
    },
    picker:{
        width: widthDemesion,
    }
});