import React, {Component} from 'react';
import {
    AsyncStorage, View, ActivityIndicator, StyleSheet,
} from 'react-native';
import {
    createSwitchNavigator, createStackNavigator,
} from 'react-navigation';

import HomeScreen from './components/mainform/Home';
import SignInScreen from './components/authentication/Login';
import RegistryScreen from './components/authentication/Registry';
import ForgetPasswordScreen from './components/authentication/ForgetPassword';
import MenuScreen from './components/mainform/Menu';
// import OrderScreen from './components/subcomponent/OrderComponent';

class AuthLoadingScreen extends Component{
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'Home' : 'Auth')
    };

    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator/>           
            </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AuthStack = createStackNavigator({
    SignIn : SignInScreen, Registry : RegistryScreen, 
    ForgetPassword : ForgetPasswordScreen,
});

const AppStack = createStackNavigator({
        Home : HomeScreen,
        Menu: MenuScreen,
        // Order : OrderScreen,
    },
    {
        headerMode: 'none',
        navigationOptions:{
            header : null,
        }
    }

);


export default createSwitchNavigator(
  {
      AuthLoading: AuthLoadingScreen,
      Home: AppStack,
      Auth: AuthStack,
  },
  {
      initialRouteName: 'AuthLoading',
  },
);
 

