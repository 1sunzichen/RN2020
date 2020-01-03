import React, {Component} from 'react';

import {View, Text, Button} from 'react-native';
interface Props {}
class HomePage extends Component<Props> {
  static navigationOptions = {
    title: 'Home',
    headerBackTitle: '返回哈哈',
  };
  render() {
    const {navigation} = this.props;

    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          backgroundColor: '#ff0',
          height: 500,
          alignItems: 'flex-end',
        }}>
        <Text>1</Text>
        <Button
          title={'GotoPage1'}
          onPress={() => {
            navigation.navigate('Page1', {name: '动态的'});
          }}
        />
        <Button
          title={'GotoPage2'}
          onPress={() => {
            navigation.navigate('Page2');
          }}
        />
        <Button
          title={'GotoPage3'}
          onPress={() => {
            navigation.navigate('Page3', {title: '标题'});
          }}
        />
        <Button
          title={'GotoPage4'}
          onPress={() => {
            navigation.navigate('Page4');
          }}
        />
        <Button
          title={'Bottom'}
          onPress={() => {
            navigation.navigate('Bottom');
          }}
        />
        <Button
          title={'Top'}
          onPress={() => {
            navigation.navigate('Top');
          }}
        />
        <Button
          title={'DrawerNav'}
          onPress={() => {
            navigation.navigate('DrawerNav');
          }}
        />
      </View>
    );
  }
}

export default HomePage;
