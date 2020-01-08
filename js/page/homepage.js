/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import PopularPage from './PopularPage';
import MyPage from './MyPage';
import TrendingPage from './TrendingPage';
import FavoritePage from './FavoritePage';
import NavigationUtil from '../../navigators/navigationUtil';

type Props = {};

export default class HomePage extends Component<Props> {
  _getBottom() {
    return createBottomTabNavigator(
      {
        PopularPage: {
          screen: PopularPage,
          navigationOptions: {
            tarBarLabel: '最热',
            tabBarIcon: ({tintColor}) => (
              <Ionicons
                name={'ios-flame'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
        TrendingPage: {
          screen: TrendingPage,
          navigationOptions: {
            tarBarLabel: '趋势',
            tabBarIcon: ({tintColor}) => (
              <Ionicons
                name={'ios-trending-up'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },

        MyPage: {
          screen: MyPage,
          navigationOptions: {
            tarBarLabel: '我的',
            tabBarIcon: ({tintColor}) => (
              <Ionicons
                name={'ios-person'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
        FavoritePage: {
          screen: FavoritePage,
          navigationOptions: {
            tarBarLabel: '个人',
            tabBarIcon: ({tintColor}) => (
              <Ionicons
                name={'ios-star'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
      },
      {
        tabBarOptions: {
          activeTintColor: 'red',
        },
        barStyle: {backgroundColor: 'red'},
      },
    );
  }

  render() {
    // 1.先把当前 拥有其他同级路由 的 路由属性 赋给 路由插件
    NavigationUtil.navigation = this.props.navigation;
    const Tab = createAppContainer(this._getBottom());
    return <Tab />;
  }
}
