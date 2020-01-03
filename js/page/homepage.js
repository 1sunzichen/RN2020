/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import NameStyle from './component/index.tsx';
import {StyleSheet, View, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

class Homepage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        {/* <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
             <NameStyle />
          </ScrollView>
        </SafeAreaView> */}
        <Text>HomePage</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

export default Homepage;