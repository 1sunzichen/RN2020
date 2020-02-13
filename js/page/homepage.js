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
import {NavigationActions} from "react-navigation";
import NavigationUtil from '../navigators/navigationUtil';
import Dyna from '../navigators/DynamicTavNavi';
import BackPressComponent from '../common/BackPressComponent.js';
type Props = {};

export default class HomePage extends Component<Props> {
  constructor(props) {
    super(props);
    // this.onBackPress=this.onBackPress.bind(this);
    this.backPress=new BackPressComponent({backPress:()=>this.onBackPress()})
  }

  onBackPress(){
       const {dispatch, nav} = this.props;
        //if (nav.index === 0) {
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
  }

  componentDidMount() {
    this.backPress.componentDidMount();
    //BackHandler.addEventListener("hardwareBackPress",this.onBackPress)
  }
  componentWillUnmount() {
     this.backPress.componentWillUnmount();
    //BackHandler.removeEventListener("hardwareBackPress",this.onBackPress);
  }
  render() {
    // 1.先把当前 拥有其他同级路由 的 路由属性 赋给 路由插件
    NavigationUtil.navigation = this.props.navigation;
    return <Dyna />;
  }
}
