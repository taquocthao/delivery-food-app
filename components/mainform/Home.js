// import thư viện
import React, {Component} from 'react';
import {
    View, Text ,TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    createBottomTabNavigator,
} from 'react-navigation';


// import các component
import OrderHistoryScreen from './OrderHistoryScreen.js';
import NotificationScreen from './NotificationScreen.js';
import ProfileScreen from './ProfileScreen.js';
import SlideShow from '../subcomponent/SlideShow';
import TopSellerForm from '../subcomponent/TopSellerForm';


class HomeScreen extends Component{

    

    ShowMoreMenu(){
        this.props.navigation.navigate('Menu');
    }

    render(){
        return (
            // wrapper
            <View style={styles.body}>
                {/* Container */}
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        {/* search bar */}
                        {/* <View style={styles.search}>
                            <Ionicons  name='ios-search' size={32}/>
                            <TextInput 
                                style={styles.inputSearch}
                                placeholder="Tìm kiếm"
                            ></TextInput>
                        </View> */}
                        {/* slideshow */}
                        <View style={styles.carousel}>
                            <SlideShow />
                        </View>
                    </View>

                    <View style={styles.box}>
                        <Text>Top bán chạy</Text>
                        <TouchableOpacity onPress={ () => {this.ShowMoreMenu()}}>
                            <View style={styles.buttonMenu}>
                                <Text style={styles.textMenu}>Xem menu</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    {/* danh sách top bán chạy */}
                    <View style={styles.categoryForm}>
                        <View style={styles.card}>
                            <TopSellerForm />
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}


export default createBottomTabNavigator(
    {
        Home: HomeScreen,
        OrderHistory: OrderHistoryScreen,
        Notification: NotificationScreen,
        Profile: ProfileScreen,
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if(routeName === 'Home'){
                    iconName = 'md-home';
                } else if(routeName === 'OrderHistory'){
                    iconName = 'ios-list';
                } else if(routeName === 'Notification'){
                    iconName = 'ios-notifications';
                } else if(routeName === 'Profile'){
                    iconName = 'ios-person';
                }
                return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor}/>;
            },
        }),
        tabBarOptions:{
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
        },
    },
);

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    header:{
        flex: 1,
    },
    categoryForm: {
        flex: 2,
        margin: 5,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    // search:{
    //     flexDirection: 'row',
    //     borderColor: 'grey',
    //     borderWidth: 1,
    //     borderRadius: 7,
    //     alignItems: 'center',
    //     margin: 8,
    //     paddingLeft: 15,
    //     zIndex: 1,
    //     position: "absolute",
    //     backgroundColor: '#fff',
    //     opacity: 0.8,
    // }
    // ,
    // inputSearch:{
    //     flex: 1,
    //     marginLeft: 5,
    // },
    carousel: {
        backgroundColor: 'red',
        flex: 1,
    },
    card:{
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        borderBottomWidth: 2,
        zIndex: 1,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.3,
    },
    box: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textMenu: {
        borderBottomWidth: 1, 
        borderColor: 'gray',
        color: 'red',
    },
});