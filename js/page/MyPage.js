/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
type Props = {};
class MyPage extends Component<Props> {
  render() {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>MyPage</Text>
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

export default MyPage;
