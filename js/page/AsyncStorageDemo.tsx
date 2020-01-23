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
type Props = {};
const KEY = 'save_key';
class AsyncStorageDemo extends Component<Props> {
  constructor(props) {
    super(props);
    this.value = '';
    this.state = {
      showText: '',
    };
  }
   doSave=async()=>  {

   await  AsyncStorage.setItem(KEY,this.value,error=>{
      error&&console.log(error.toString())
    })
  }
   doRemove=async()=> {
    await AsyncStorage.removeItem(KEY,error=>{
      error&&console.log(error.toString());
    })

  }
  doData=async()=>  {
 
   await AsyncStorage.getItem(KEY,(error,value)=>{
     this.setState({
       showText:value
     })
  
     error&&console.log(error.toString())
   })
    

  }
  render() {
    return (
      <View>
        <Text style={styles.sectionText}>AsyncStorage 的使用</Text>

        <TextInput
          style={styles.input}
          onChangeText={text => {
            this.value = text;
          }}
        />
        <View>
          <Text
            onPress={() => {
              this.doData();
            }}>
            huoqu
          </Text>
          <Text
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
          </Text>
         
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

export default AsyncStorageDemo;
