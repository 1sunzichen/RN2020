/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Button,TouchableOpacity} from 'react-native';
import Actions from '../action';
import {connect} from 'react-redux';
import NavigationBarDiy from '../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
const THEME_COLOR="#678";
class  MyPage extends Component {
  getRightButton(){
    return <View style={{flexDirection:"row"}}>
      <TouchableOpacity
      onPress={()=>{

      }}>
        <View style={{padding:5,marginRight:8}}>
            <Feather
              name={'search'}
              size={24}
              style={{color:"white"}}
            />
        </View>
      </TouchableOpacity>
    </View>
  }
  getLeftButton(callback){
    return <TouchableOpacity
        style={{padding:8,paddingLeft:12}}
        onPress={callback}
    >
      <Ionicons
          name={'ios-arrow-back'}
          size={26}
          
      />
    
    </TouchableOpacity>
  }
  render() {
    let statusBar={
      backgroundColor:THEME_COLOR,
      barStyle:'light-content'
    }
    let barMy=<NavigationBarDiy
          title="我的"
          statusBar={statusBar}
          style={{backgroundColor:THEME_COLOR}}
          rightButton={this.getRightButton()}
          leftButton={this.getLeftButton()}
    />
    
    return (
      <View style={styles.sectionContainer}>
        {barMy}
        <Text style={styles.sectionText}>MyPage</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 30,
    flex:1
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
)(MyPage);
