/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {name as appName} from './app.json';

import WelcomePage from './js/page/welcome.js';

const Appd = createAppContainer(WelcomePage);
AppRegistry.registerComponent(appName, () => Appd);
