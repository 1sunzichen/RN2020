/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../../navigators/navigationUtil';
import {View, Text, StyleSheet} from 'react-native';
import {createAppContainer} from 'react-navigation';

type Props = {};
class PopularPage extends Component<Props> {
  render() {
    const TabNavigator = createMaterialTopTabNavigator(
      {
        PopularTab1: {
          screen: PopularTab,
          navigationOptions: {
            title: 'Tab1',
          },
        },
        PopularTab3: {
          screen: PopularTab,
          navigationOptions: {
            title: 'Tab2',
          },
        },
      },
      {
        tabBarOptions: {
          style: {
            paddingTop: 32,
          },
          indicatorStyle: {
            height: 2,
          }, //标签指示器的样式
          labelStyle: {
            fontSize: 23,
          }, //文件样式
        },
      },
    );
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
          12131
        </Text>
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

export default PopularPage;
