import React, {Component} from 'react';
import {
    View, Text , TextInput, StyleSheet, TouchableOpacity, 
    ScrollView, Alert, AsyncStorage,
} from 'react-native';

import {URL_REGISTRY} from '../Url';

export default class Registry extends Component{

    static navigationOptions = {
        title : "Đăng ký tài khoản",
    }

    constructor(props){
        super(props);
        this.state = {
            
            name : '',
            email : '',
            password : '',
            rePassword: '',
            phone: '',
            address : '',
        }
    }

    createAccount(){
        var userName = this.state.name;
        var userEmail = this.state.email;
        var userPassword = this.state.password;
        var rePassword = this.state.rePassword;
        var userPhone = this.state.phone;
        var userAddress = this.state.address;

        if(userName === '' || userEmail === '' || userPassword === ''
        || rePassword === '' || userPhone === '' || userAddress === ''){
            Alert.alert("Error", "Bạn nhập thiếu thông tin");
        } else if(userPassword != rePassword){
            Alert.alert("Error", "Mật khẩu không khớp");
        } else{
            //
            var url = URL_REGISTRY;
            fetch(url, {
                method: "POST",
                headers: {
                    "Accept" : "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // id : 0,
                    name : userName,
                    email : userEmail,
                    password : userPassword,
                    gender: 1,
                    dob: '00-00-1990',
                    phonenumber : userPhone,
                    address : userAddress,
                    image: '',
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                var userDetails = JSON.stringify(responseJson);
                if(responseJson.id > 0){
                   this.SaveUserInfor(userDetails)
                   .then(()=> {this.props.navigation.navigate("Home")})
                }
                else {
                    Alert.alert("Đăng ký thất bại");
                }
                // console.log(responseJson);
            })
            .catch((err) => console.error(err))
        }
    }

    async SaveUserInfor(userInfo){
        await AsyncStorage.setItem('userToken', userInfo);
    }

    checkPassword(){
        if(this.state.password != this.state.rePassword){
            Alert.alert("Mật khẩu không khớp");
        }
        return;
    }

    render(){
        return (
            <View style={styles.body}>
                {/* <View style={styles.container}> */}
                <ScrollView style={styles.container}>
                    <View style={styles.viewbox}>
                        <TextInput style={styles.textinput}
                        placeholder="Họ và tên"
                        onChangeText={(text) => {this.setState({name : text})}}/>
                    </View>
                    <View style={styles.viewbox}>
                        <TextInput style={styles.textinput}
                        placeholder="Email"
                        onChangeText={(text) => {this.setState({email : text})}}/>
                    </View>
                    <View style={styles.viewbox}>
                        <TextInput style={styles.textinput}
                        placeholder="Mật khẩu"
                        maxLength={40}
                        secureTextEntry={true}
                        onChangeText={(text) => {this.setState({password : text})}}
                        />
                    </View>
                    <View style={styles.viewbox}>
                        <TextInput style={styles.textinput}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={true}
                        onChangeText={(text) => {this.setState({rePassword : text})}}
                        onBlur={ () => {this.checkPassword()}}/>
                    </View>
                    <View style={styles.viewbox}>
                        <TextInput style={styles.textinput}
                        placeholder="Số điện thoại"
                        textContentType="telephoneNumber"
                        onChangeText={(text) => {this.setState({phone : text})}}/>
                    </View>
                    <View style={styles.viewbox}>
                        <TextInput style={styles.textinput}
                        placeholder="Địa chỉ"
                        onChangeText={(text) => {this.setState({address : text})}}/>
                    </View>
                    <View style={styles.viewbox}>
                        <TouchableOpacity onPress={() => {this.createAccount()}}>
                            <View style={styles.buttonCreate}>
                                <Text>Tạo tài khoản</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                {/* </View> */}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {

        flex: 1,
        padding: 15,

    }, 
    container: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: 'gray',
        borderRadius: 8,
    },
    viewbox:{
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    textinput:{
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
    buttonCreate: {
        backgroundColor: '#fff',
        borderColor: 'lightblue',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    }
});