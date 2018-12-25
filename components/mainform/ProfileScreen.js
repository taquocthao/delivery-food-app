import React, {Component} from 'react';
import {
    View, Text, AsyncStorage, Image, StyleSheet, 
    Dimensions, ScrollView, Alert, TextInput, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';  
import {URL_UPDATE_USER} from '../Url';


export default class Profile extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            userID : '',
            userName : '',
            userEmail : '',
            userPassword : '',
            userGender: '',
            userBirthday: '',
            userPhone: '',
            userAddress: '',
            userImage: '',
        }
    }

    componentDidMount(){
        this._retrieveUserDetail();
    }

    _signOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
    }

    _retrieveUserDetail = async () =>{
        try{
            const userDetails = await AsyncStorage.getItem('userToken');
            if(userDetails !== null){
                myObject = JSON.parse(userDetails);
                // const genderString = 
                this.setState({
                    userID : myObject.id,
                    userName : myObject.name,
                    userEmail : myObject.email,
                    userPassword : myObject.password,
                    userImage: myObject.image,
                    userGender: myObject.gender === 1 ? 'Nữ' : 'Nam',
                    userBirthday: myObject.dob,
                    userPhone : myObject.phonenumber,
                    userAddress: myObject.address,
                })
            }
        }
        catch(err){
            console.error("error while retrieve user data", err);
        }
    }

    updateUser(){
        var url =  URL_UPDATE_USER;
        fetch(url, {
            method: 'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id : this.state.userID,
                name : this.state.userName,
                email : this.state.userEmail,
                password : this.state.userPassword,
                gender : this.state.userGender === 'Nam' ? 2 : 1,
                dob : this.state.userBirthday,
                phonenumber : this.state.userPhone,
                address : this.state.userAddress,
                image : this.state.userImage,
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            // AsyncStorage.clear();
            // AsyncStorage.setItem('userToken', JSON.stringify(responseJson));
            // Alert.alert("Update user", "Cập nhật thành công!");
            if(responseJson.id > 0){
                this.saveProfile(JSON.stringify(responseJson))
                .then(()=> {
                    Alert.alert("Cập nhật thành công!");
                });
            } else {
                Alert.alert("Cập nhật thất bại!");
            }
            // console.log(responseJson);
        })
        .catch((err) => {console.error(err)});
    }

    async saveProfile(userInfo){
        await AsyncStorage.setItem('userToken', userInfo);
    }

    setGender(){
        Alert.alert("Chọn giới tính", 'vui lòng chọn giới tính của bạn',[
            {text: 'Nam', onPress: () => {this.setState({userGender : 'Nam'})}},
            {text: 'Nữ', onPress: () => {this.setState({userGender : 'Nữ'})}}
        ], {cancelable: false});
    }

    render(){
        return (
            
            <View style={styles.body}>

                {/* container */}
                <ScrollView style={styles.container}>

                    {/* header - image profile */}
                    <View style={styles.header}>
                        <Image source={{uri : 'https://npengage.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}} 
                         style={styles.image} />
                    </View>
                    
                    {/* content */}
                    <View style={styles.content}>

                        {/* view user name */}
                        <View style={styles.viewbox}>
                            <Ionicons name="ios-person" size={30}/>
                            <TextInput style={styles.input} placeholder={this.state.userName}
                             onChangeText={ (textName) => {this.state.userName = textName} }/>
                        </View > 

                        {/* view user phone number */}
                        <View style={styles.viewbox}>
                            <Ionicons name="ios-call" size={30}/>
                            <TextInput style={styles.input} placeholder={this.state.userPhone}
                            onChangeText={(textPhone) => {this.state.userPhone = textPhone}} />
                        </View>

                        {/* view user email */}
                        <View style={styles.viewbox}>
                            <Ionicons name="ios-mail" size={30}/>
                            <TextInput style={styles.input} placeholder={this.state.userEmail}
                            onChangeText = {(text) => {this.state.userEmail = text}}/>
                        </View>

                        {/* view user birthday */}
                        <View style={styles.viewbox}>
                            <Ionicons name="ios-calendar" size={30}/>
                            <TextInput style={styles.input} placeholder={this.state.userBirthday}/>
                        </View>

                        {/* view user gender */}
                        <View style={styles.viewbox}>
                            <Ionicons name="ios-transgender" size={30}/>
                            <TouchableOpacity style={styles.input} onPress={() => {this.setGender()}}>
                                <View style={styles.button}>
                                    <Text style={{color: 'gray'}}>{this.state.userGender}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* view user address */}
                        <View style={styles.viewbox}>
                            <Ionicons name="ios-locate" size={30}/>
                            <TextInput style={styles.input} placeholder={this.state.userAddress}
                            onChangeText = {(text) => {this.state.userAddress = text}}/>
                        </View>
                    </View> 
                    <View style={styles.footer}>
                        {/* Cập nhật nhân viên */}
                        <View >
                            <TouchableOpacity onPress={() => {this.updateUser()}}>
                                <View style={styles.buttonUpdate}>
                                    <Text>Cập nhật thông tin</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* đăng xuất */}
                        <View >
                            <TouchableOpacity onPress={() => {this._signOut()}}>
                                <View style={styles.buttonSignOut}>
                                    <Text>Đăng xuất</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    
                    </View>

                </ScrollView>

            </View>
          
        );
    }
}

const size = Dimensions.get('window').height;

const styles = StyleSheet.create({
    body:{
        padding: 15,
        flex: 1,
    },
    container:{
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 6,
    },
    header:{
        flex: 1,
        backgroundColor: '#D3DCE3',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    image:{
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    content:{
        flex: 2,
        
    },
    viewbox:{
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 6,
        // marginTop: 8,
        marginRight: 5,
        marginLeft: 5,
        padding: 8,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    input:{
        marginLeft: 10,
    },
    button:{
        backgroundColor: 'lightblue',
        padding: 8,
        borderRadius: 6,

    },
    footer:{
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonUpdate:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "blue",
        padding: 12,
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 8,
    },
    buttonSignOut:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "red",
        padding: 12,
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 8,
    }
});