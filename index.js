/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import {createAppContainer} from 'react-navigation';
import {name as appName} from './app.json';
// import AppNatigator from './navigators/AppNavigator';
//import WelcomePage from './js/page/welcome.js';
import App from './App';
//const Appd = createAppContainer(AppNatigator);
AppRegistry.registerComponent(appName, () => App);
