import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from '../js/page/homepage';
import WelcomePage from '../js/page/welcome';
import DetailPage from '../js/page/detailPage';
import {Button, Platform, ScrollView, SafeAreaView} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
const InitNavigate = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null,
    },
  },
});
const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null,
    },
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      //header: null,
    },
  },
});
export default createSwitchNavigator(
  {
    Init: InitNavigate,
    Main: MainNavigator,
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);
