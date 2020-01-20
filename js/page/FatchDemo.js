/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
type Props = {};
class FatchDemo extends Component<Props> {
  constructor(props) {
    super(props);
    this.searchKey = '';
    this.state = {
      showText: '',
    };
  }

  loadData() {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
    fetch(url)
      .then(response => response.text())
      .then(res => {
        this.setState({
          showText: res,
        });
      });
  }
  loadData2() {
    let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('new response not ok');
      })
      .then(res => {
        this.setState({
          showText: res,
        });
      })
      .catch(e => {
        this.setState({
          showText: e.toString(),
        });
      });
  }
  render() {
    return (
      <View>
        <Text style={styles.sectionText}>FatchPage</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.searchKey = text;
          }}
        />
        <Button
          title={'查询'}
          onPress={() => {
            this.loadData();
          }}
        />
        <Button
          title={'查询2'}
          onPress={() => {
            this.loadData2();
          }}
        />
        <Text>{this.state.showText}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    height: 60,
    marginRight: 10,
    paddingTop: 30,
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

export default FatchDemo;
