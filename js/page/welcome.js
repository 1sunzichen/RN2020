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

class Welcome extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text>WelcomePage</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({});

export default Welcome;
