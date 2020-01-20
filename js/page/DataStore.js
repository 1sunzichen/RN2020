/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DataStoreFN from '../expand/dao/dataStore'
type Props = {};
const KEY = 'save_key';
class DataStore extends Component<Props> {
  constructor(props) {
    super(props);
    this.value = '';
    this.state = {
      showText: '',
    };
    this.dataStoreFn=new DataStoreFN();
  }
  loadData(){
   let url = `https://api.github.com/search/repositories?q=${this.value}`;
   this.dataStoreFn.fetchData(url)
   .then(data=>{
     let showData=`
      ${new Date(data.timestamp)}
      \n
      ${JSON.stringify(data.data)}
     `;
     this.setState({
       showText:showData
     })
   }).catch(error=>{
     error&&console.error(error.toString());
   })
  }
    

  
  render() {
    return (
      <View>
        <Text style={styles.sectionText}>DataStore 的使用</Text>

        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />
        <View>
          <Text
            onPress={() => {
              this.loadData();
            }}>
            获取
          </Text>
          {/* <Text
            onPress={() => {
              this.doSave();
            }}>
            存贮
          </Text>
          <Text
            onPress={() => {
              this.doRemove();
            }}>
            yichu
          </Text> */}
         
        </View>

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
    borderColor:'red',
    borderWidth:2,
    fontSize:30
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

export default DataStore;
