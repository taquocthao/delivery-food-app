import React, {Component} from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from 'react-navigation';
// import các sub component 
import IncomingView from '../subcomponent/IncomingView';
import HistoryInvoiceView from '../subcomponent/HistoryInvoiceView';

export default createMaterialTopTabNavigator(
    {
        Incoming : IncomingView,
        History : HistoryInvoiceView,
    },
    {
       
        tabBarOptions:{
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
            upperCaseLabel:false,
            tabStyle:{
                borderRightWidth: 0.5,
            },
            indicatorStyle:{
               opacity: 0,
            },
            style :{
                borderWidth: 0.5,
                margin : 15,
                backgroundColor: "#fff",
                borderRadius: 7,
            },
            
        }
    }
)
