/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Actions from '../action';
import {connect} from 'react-redux';
class TrendingPage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>TrendingPage</Text>
        <Button
          title="改变主题色"
          onPress={() => {
            this.props.onThemeChange({
              theme: '#f0f',
              updateTime: new Date().getTime(),
            });
            // navigation.setParams({
            //   theme: {
            //     tintColor: 'red',
            //     updateTime: new Date().getTime(),
            //   },
            // });
          }}
        />
        <Button
          title="改变黄色色"
          onPress={() => {
            this.props.onThemeChange({
              theme: 'yellow',
              updateTime: new Date().getTime(),
            });
            // navigation.setParams({
            //   theme: {
            //     tintColor: 'yellow',
            //     updateTime: new Date().getTime(),
            //   },
            // });
          }}
        />
        <Button
          title="恢复"
          onPress={() => {
            this.props.onThemeChange({
              theme: 'blue',
              updateTime: new Date().getTime(),
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
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(Actions.onThemeChange(theme)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TrendingPage);
