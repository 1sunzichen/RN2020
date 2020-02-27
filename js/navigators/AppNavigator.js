import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from '../page/homepage';
import WelcomePage from '../page/welcome';
import DetailPage from '../page/detailPage';
import WebViewPage from '../page/WebViewPage.js';
import AboutPage from '../page/about/AboutPage.js';
import AboutMePage from '../page/about/AboutMePage.js';
import {Button, Platform, ScrollView, SafeAreaView} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';
import {connect} from 'react-redux';
// import FetchPage from '../page/FatchDemo';
import AsyncPageDemo from '../page/AsyncStorageDemo';
import DataStorePage from '../page/DataStore';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
export const rootCom = 'Init';
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
      //隐藏 头部
      header: null,
    },
  },
  WebViewPage: {
    screen: WebViewPage,
    navigationOptions: {
      header: null,
    }
  },
  AboutPage: {
    screen: AboutPage,
    navigationOptions: {
      header: null,
    }
  },
  AboutMePage: {
    screen: AboutMePage,
    navigationOptions: {
      header: null,
    }
  },

  // FetchPage: {
  //   screen: FetchPage,
  //   navigationOptions: {
  //     //header: null,
  //   },
  // },
  // AsyncPageDemo: {
  //   screen: AsyncPageDemo,
  //   navigationOptions: {
  //     //header: null,
  //   },
  // },
  // DataStorePage: {
  //   screen: DataStorePage,
  //   navigationOptions: {
  //     //header: null,
  //   },
  // },
});
export const RootNavigator = createSwitchNavigator(
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
// 初始化react-navigation 和 redux 中间件
export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root',
);
// 根导航器

const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

// state-props的映射关系
const mapStateToProps = state => ({
  state: state.nav,
});
// 链接 react 组件于 Redux store
export default connect(mapStateToProps)(AppWithNavigationState);
