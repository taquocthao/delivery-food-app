/** @format */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
// import OrderHistory from './components/mainform/OrderHistoryScreen';
import CheckInternet from  './components/CheckConnectInternet';
// import Order from './components/subcomponent/OrderComponent.js';
AppRegistry.registerComponent(appName, () => CheckInternet);
