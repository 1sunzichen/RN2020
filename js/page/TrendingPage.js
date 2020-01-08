/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
class TrendingPage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>TrendingPage</Text>
        <Button
          title="改变主题色"
          onPress={() => {
            navigation.setParams({
              theme: {
                tintColor: 'red',
                updateTime: new Date().getTime(),
              },
            });
          }}
        />
        <Button
          title="改变黄色色"
          onPress={() => {
            navigation.setParams({
              theme: {
                tintColor: 'yellow',
                updateTime: new Date().getTime(),
              },
            });
          }}
        />
        <Button
          title="恢复"
          onPress={() => {
            navigation.setParams({
              theme: {
                tintColor: '',
                updateTime: new Date().getTime(),
              },
            });
          }}
        />
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

export default TrendingPage;
