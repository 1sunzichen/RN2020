/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {StyleSheet, View, Text} from 'react-native';
import myNavigation from '../navigators/navigationUtil';

class Welcome extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      // const {navigation} = this.props;
      // navigation.navigate('Main');
      myNavigation.resetHome(this.props);
    }, 2000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>WelcomePage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 320,
    paddingHorizontal: 24,
  },
  sectionText: {
    textAlign: 'center',
    fontSize: 30,
  },
});

export default Welcome;
