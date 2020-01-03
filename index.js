/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';
import {createAppContainer} from 'react-navigation';
//import AppNavigator from './navigators/AppNavigators.tsx';
import {name as appName} from './app.json';
import App from './App.js';
// import {createStackNavigator} from 'react-navigation-stack';
// import FlatListDemo from './pageList/FlatListDemo.tsx';
// import SwipperFlatListDemo from './pageList/SwipperFlatListDemo.tsx';
// import SectionFlatListDemo from './pageList/SectionFlatListDemo.tsx';
import WelcomePage from './js/page/welcome.js';
// const AppRoot = createStackNavigator({
//   App: {
//     screen: App,
//   },
//   FlatListDemo: {
//     screen: FlatListDemo,
//     navigationOptions: {
//       title: 'FlatListDemo',
//     },
//   },
//   SwipperFlatListDemo: {
//     screen: SwipperFlatListDemo,
//     navigationOptions: {
//       title: 'SwipperFlatListDemo',
//     },
//   },
//   SectionFlatListDemo: {
//     screen: SectionFlatListDemo,
//     navigationOptions: {
//       title: 'SectionFlatListDemo',
//     },
//   },
// });
// const AppC = createAppContainer(AppRoot);
// const AppC = createAppContainer(AppNavigator);
const AppC = createAppContainer(WelcomePage);
AppRegistry.registerComponent(appName, () => AppC);
