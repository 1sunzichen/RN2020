/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
// import {View, Text, StyleSheet, Platform} from 'react-native';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
// import {createBottomTabNavigator} from 'react-navigation-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {createAppContainer} from 'react-navigation';
// import PopularPage from './PopularPage';
// import MyPage from './MyPage';
// import TrendingPage from './TrendingPage';
// import FavoritePage from './FavoritePage';
import NavigationUtil from '../navigators/navigationUtil';
import Dyna from '../navigators/DynamicTavNavi';
type Props = {};

export default class HomePage extends Component<Props> {
  render() {
    // 1.先把当前 拥有其他同级路由 的 路由属性 赋给 路由插件
    NavigationUtil.navigation = this.props.navigation;
    return <Dyna />;
  }
}
