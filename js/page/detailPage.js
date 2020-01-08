/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {StyleSheet, View, Text} from 'react-native';

class DetailPage extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      const {navigation} = this.props;
      navigation.navigate('Main');
    }, 2000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <Text>DetailPage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default DetailPage;
