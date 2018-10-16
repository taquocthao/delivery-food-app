// import thư viện hỗ trợ
import React, {Component} from 'react';
import {
    View, TextInput, Text, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import { 
    Divider
} from 'react-native-elements';
import {Button , Card} from 'react-native-material-ui';
import { createStackNavigator } from 'react-navigation';

// import các component
// import Home from './mma';

export default class LoginPage extends Component{
    //bỏ header trên giao diện login
    static navigationOptions ={
        header: null,
    }
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isEmailValid: false,
        }
    }

    checkLogin(email, password){
        if(email === '' || password === ''){
            Alert.alert("email hoặc mật khẩu không được để trống")
        }else {
            if(email === 'ta' && password === '123'){
                this.props.navigation.navigate('home');
            } else{
                Alert.alert("Sai tài khoản hay mật khẩu");
            }
        }
    }
   
    // Kiểm tra giá trị nhập vào (email và password)
    checkValidEmail(email){
        if(email === ''){
            
        } else if(email != ''){
            isEmailValid = true;
        }
    }

    render(){
        return (
            <View style={styles.body}>
                {/* <View style={styles.container}> */}
                <Card style={styles.container}> 
                   <View style={styles.form}>
                    
                        {/* text input email */}
                        <TextInput style={styles.textinput} 
                            placeholder="Nhập email" 
                            maxLength={40}
                            keyboardType='email-address'
                            // Sự kiện rời khỏi text input email
                            onBlur={()=> {this.checkValidEmail(this.state.email)}}
                            onChangeText={(em)=> {this.setState({email: em})}}/>
                        {/* text input password */}
                        <TextInput style={styles.textinput} 
                            placeholder="Nhập mật khẩu" 
                            maxLength={40}
                            secureTextEntry={true}
                            onChangeText={(pwd)=> {this.setState({password: pwd})}}/>

                        <View style={{marginTop: 20, alignItems: 'flex-end'}}>
                            {/* Button login */}
                           {/* <TouchableOpacity style={styles.button} onPress={ () => 
                            this.checkLogin(this.state.email, this.state.password) 
                            } >
                               <View>
                                   <Text>Đăng nhập</Text>
                               </View>
                           </TouchableOpacity> */}
                           <Button raised primary text="Login" onPress={()=> {
                               this.checkLogin(this.state.email, this.state.password)}
                            }/>
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
                                    <TouchableOpacity>
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
                   </View>
                {/* </View> */}
                </Card>
            </View>
        );
    }
}

// khai báo các màn hình (components)
const RootStack = createStackNavigator(
    {
        login: {
            screen: LoginPage,
        },
        home: Home,
    },
    {
        initialRouteName: 'login',
    },

);

export default class Login extends Component{
    render(){
        return (
            <RootStack />
        );
    }
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        padding: 15,
    },
    container:{
        borderRadius: 5,
    },
    form: {
        padding: 10,
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