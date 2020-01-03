/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import NameStyle from './component/index.tsx';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Button,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

class App extends Component {
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
        <Button
          title={'FlatListDemo'}
          onPress={() => {
            navigation.navigate('FlatListDemo');
          }}
        />
        <Button
          title={'SwipperFlatListDemo'}
          onPress={() => {
            navigation.navigate('SwipperFlatListDemo');
          }}
        />
        <Button
          title={'SectionFlatListDemo'}
          onPress={() => {
            navigation.navigate('SectionFlatListDemo');
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
