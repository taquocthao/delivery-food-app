/** @format */

import {AppRegistry} from 'react-native';
// import Login from './components/authentication/Login'
import {name as appName} from './app.json';
// prototype, will be delete
import Home from './components/mainform/Home';

AppRegistry.registerComponent(appName, () => Home);
