// import thư viện hỗ trợ
import React, {Component} from 'react';
import {
    View, TextInput, Text, StyleSheet, TouchableOpacity, 
    Alert, AsyncStorage, ScrollView, ActivityIndicator
} from 'react-native';
import { 
    Divider
} from 'react-native-elements';
import {Button} from 'react-native-material-ui';

import {URL_LOGIN} from '../Url';


export default class Login extends Component{
    
    static navigationOptions = {
        header: null,
    }

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            userDetails: '',
            isLoading : false,
        }
    }
    // kiểm tra đăng nhập
    checkLogin(em, pwd){
        if(em === '' || pwd === '' || em === null || pwd === null){
            Alert.alert("Invalid input","Email hoặc mật khẩu không được để trống");
        }else {
            this.setState({isLoading : true});
            // gọi service kiểm tra đăng nhập
            fetch(URL_LOGIN,
                {
                    method: 'POST',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify({
                        email : em,
                        password : pwd,
                    })
                }
            )
            .then((response) => response.json())
            .then(responseJson => {
                if(responseJson !== null){
                    this.setState({ userDetails : JSON.stringify(responseJson),}, function(){
                        // luư thông tin user và đi đến trang chủ
                        this._saveUserDetails()
                        .then( () => this.setState({isLoading: false}))
                        .then(() => this.props.navigation.navigate("Home"))
                    });
                } else {
                    // console.log("failure")
                    this.setState({isLoading: false});
                    Alert.alert("Đăng nhập thất bại","Email hoặc mật khẩu không đúng");
                }
            })
            .catch((error) => console.error(error))
        }

    }

    _saveUserDetails = async () => {
        await AsyncStorage.setItem("userToken", this.state.userDetails);
    }

    openModalRegistry(){
        this.props.navigation.navigate('Registry');
    }
    
   
    render(){
        if(this.state.isLoading){
            return (
                <View style={{flex:1, alignItems: "center", justifyContent: 'center'}}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.body}>
                <View style={styles.container}>
                {/* <Card style={styles.container}>  */}
                   <ScrollView style={styles.form}>
                        {/* text input email */}
                        <TextInput style={styles.textinput} 
                            placeholder="Nhập email" 
                            maxLength={40}
                            keyboardType='email-address'
                            // Sự kiện rời khỏi text input email
                            // onBlur={()=> {this.checkValidEmail(this.state.email)}}
                            onChangeText={(em)=> {this.setState({email: em})}}/>
                        {/* text input password */}
                        <TextInput style={styles.textinput} 
                            placeholder="Nhập mật khẩu" 
                            maxLength={40}
                            secureTextEntry={true}
                            onChangeText={(pwd)=> {this.setState({password: pwd})}}/>

                        <View style={{marginTop: 20, alignItems: 'flex-end'}}>
                            {/* Button login */}
                           <TouchableOpacity style={styles.button} onPress={ () => 
                            this.checkLogin(this.state.email, this.state.password) 
                            } >
                               <View>
                                   <Text>Đăng nhập</Text>
                               </View>
                           </TouchableOpacity>
                           
                        </View>
                        <View style={styles.backgroudLabel}>
                            {/* chuyển đến giao diện quên mật khẩu */}
                            <TouchableOpacity >
                                <View>
                                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>Quên mật khẩu</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ alignItems: 'flex-end'}}>
                                <View style={{flexDirection: 'row',}}>
                                    <Text>Chưa có tài khoản? </Text>
                                    {/* chuyển đến component đăng ký */}
                                    <TouchableOpacity onPress={ () => {this.openModalRegistry()}}>
                                        <View>
                                            <Text style={{fontWeight: 'bold',}}>Đăng ký ngay</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                
                            </View>
                        </View>
                        <Divider style={{backgroundColor: 'grey'}}></Divider>
                        {/* google sign in button & facebook login button */}
                        <View style={styles.backgroundNetWorkLogin}>
                            {/* prototype, sẽ bị thay thế*/}
                            <View style={{marginRight: 10, flex: 1}}>
                                <Button raised accent text="Google"/>
                            </View>
                            <View style={{ marginLeft: 10, flex: 1}}>
                                <Button raised primary text="Facebook"/>
                            </View>
                        </View>
                   </ScrollView>
                </View>
                {/* </Card> */}
            </View>
        );
    }
}

// const otherStack = createStackNavigator({
//     Registry : RegistryModal,
//     ForgetPassword : ForgetPasswordModal,
// });

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 15,
    },
    container:{
        flex: 1,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1,
    },
    form: {
        padding: 10,
        flex: 1,
    },
    textinput:{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        margin: 10,
    },
    button:{
        backgroundColor: '#fff',
        padding: 8,
        width: 100,
        height: 50,
        borderRadius: 5,
        borderColor: '#337ab7',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroudLabel:{
        marginTop: 15,
        marginBottom: 30,
       
    },
    backgroundNetWorkLogin:{
        flexDirection: 'row',
        marginTop: 30,
        marginBottom: 30,
    }
});