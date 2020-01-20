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
import PopularPage from '../page/PopularPage';
import MyPage from '../page/MyPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import {connect} from 'react-redux';
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

class DynamicTab extends Component<Props> {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  _getBottom() {
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = BottomTab;
    console.log(this.props, 'propss');

    const tabs = {PopularPage, TrendingPage, FavoritePage,MyPage};
    //PopularPage.navigationOptions.tabBarLabel = '最新';
    return createBottomTabNavigator(tabs, {
      tabBarComponent: props => {
        return <TabBarCom theme={this.props.theme} {...props} />;
      },
    });
  }

  render() {
    // 1.先把当前 拥有其他同级路由 的 路由属性 赋给 路由插件
    if (this.Tab) {
      let T = this.Tab;
      return <T />;
    }
    this.Tab = createAppContainer(this._getBottom());
    let B = this.Tab;
    return <B />;
  }
}
class TabBarCom extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props, 'propss');

    this.theme = {
      tintColor: props.activeTintColor,
      updateTime: new Date().getTime(),
    };
  }
  render() {
    const {routes, index} = this.props.navigation.state;
    if (routes[index].params) {
      const {theme} = routes[index].params;
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />;
  }
}
const mapStateToProps = state => ({
  // 3.将洋葱 一层 一层 剥开theme
  theme: state.theme.theme,
  newTime: state.theme.newTime,
});
export default connect(mapStateToProps)(DynamicTab);
