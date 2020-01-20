/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// FavoritePage


import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigators/navigationUtil';
import {View, Text, StyleSheet, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';

type Props = {};
class FavoritePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.TabNames = ['GOD', 'Dog', '1212', '1212', '12121212'];
  }
  _genTabs() {
    const Tabs = {};
    this.TabNames.map((item, index) => {
      Tabs[`tab${index}`] = {
        //传递参数 props => <PopularTab {...props} Tablabel={item} />,
        screen: props => <PopularTab {...props} Tablabel={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return Tabs;
  }

  render() {
    const TabNavigator = createMaterialTopTabNavigator(this._genTabs(), {
      tabBarOptions: {
        upperCaseLabel: false,
        scrllEnabled: true, //是否滚动
        tabStyle: {
          minWidth: 50,
          upperCaseLabel: false,
        },
        style: {
          paddingTop: 32,
          backgroundColor: '#567',
        },
        indicatorStyle: {
          height: 2,
          backgroundColor: '#456',
        }, //标签指示器的样式
        labelStyle: {
          fontSize: 23,
        }, //文件样式
      },
    });
    const Tab = createAppContainer(TabNavigator);
    return <Tab style={styles.sectionContainerTab} />;
  }
}
class PopularTab extends Component<Props> {
  render() {
    const {Tablabel} = this.props;
    return (
      <View style={styles.sectionContainerTab}>
        <Text>{Tablabel}</Text>
        <Text
          onPress={() => {
            NavigationUtil.goPage(
              //2:这块要换成 路由插件 存贮的路由  换不换都行 插件会再次处理
              {navigation: NavigationUtil.navigation},
              'DetailPage',
            );
          }}>
          跳转到详情页
        </Text>
        <Button
          title="fetch"
          onPress={() => {
            NavigationUtil.goPage(
              //2:这块要换成 路由插件 存贮的路由  换不换都行 插件会再次处理
              {navigation: NavigationUtil.navigation},
              'FetchPage',
            );
          }}
        />
        <Button
          title="AsyncPage"
          onPress={() => {
            NavigationUtil.goPage(
              //2:这块要换成 路由插件 存贮的路由  换不换都行 插件会再次处理
              {navigation: NavigationUtil.navigation},
              'AsyncPageDemo',
            );
          }}
        />
        <Button
          title="DataStorePage"
          onPress={() => {
            NavigationUtil.goPage(
              //2:这块要换成 路由插件 存贮的路由  换不换都行 插件会再次处理
              {navigation: NavigationUtil.navigation},
              'DataStorePage',
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainerTab: {
    marginTop: 50,
  },
  sectionContainer: {
    marginTop: 320,
    paddingHorizontal: 24,
  },
  sectionText: {
    textAlign: 'center',
    fontSize: 30,
  },
});

export default FavoritePage;
