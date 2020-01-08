/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @自定义配置路由页面
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createAppContainer} from 'react-navigation';
import PopularPage from '../js/page/PopularPage';
import MyPage from '../js/page/MyPage';
import TrendingPage from '../js/page/TrendingPage';
import FavoritePage from '../js/page/FavoritePage';
const BottomTab = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name={'ios-flame'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
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
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name={'ios-person'} size={26} style={{color: tintColor}} />
      ),
    },
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '个人',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name={'ios-star'} size={26} style={{color: tintColor}} />
      ),
    },
  },
};
type Props = {};

export default class DynamicTab extends Component<Props> {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _getBottom() {
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = BottomTab;
    const tabs = {PopularPage, TrendingPage, FavoritePage};
    PopularPage.navigationOptions.tabBarLabel = '最新';
    return createBottomTabNavigator(tabs, {
      tabBarComponent: TabBarCom,
    });
  }

  render() {
    // 1.先把当前 拥有其他同级路由 的 路由属性 赋给 路由插件
    const Tab = createAppContainer(this._getBottom());
    return <Tab />;
  }
}
class TabBarCom extends React.Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    };
  }
  render() {
    const {routes, index} = this.props.navigation.state;
    if (routes[index].params) {
      console.log(routes[index]);

      const {theme} = routes[index].params;
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    );
  }
}
