/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, Button,TouchableOpacity,ScrollView} from 'react-native';
import Actions from '../action';
import {connect} from 'react-redux';
import NavigationBarDiy from '../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {MORE_MENU} from '../common/MORE_MENU.js';
import GlobalStyles from '../res/GlobalStyles.js';
import ViewUtil from '../util/viewUtil.js';
import NavigationUtil from '../navigators/navigationUtil.js'
const THEME_COLOR="#678";
class  MyPage extends Component {
  getRightButton(){
    return <View style={{flexDirection:"row"}}>
      <TouchableOpacity
      onPress={()=>{
        //console.log('====================================');
        //console.log(12121);
        //console.log('====================================');
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
  onHandlerClick(menu){
    console.log(menu,"99999");
    
    let RouteName,params={};
    switch(menu){
      case MORE_MENU.Tutorial:
        //跳转到 教程页
        RouteName='WebViewPage';
        params.title="教程";
        params.url="https://www.9xkd.com/1914210302.html";
      break;
      case MORE_MENU.About:
        //跳转到 关于页
        RouteName='AboutPage';
      break;
      case MORE_MENU.About_Author:
        //跳转到 关于页
        RouteName='AboutMePage';
      break;
    }
    if(RouteName){
      NavigationUtil.goPage(params,RouteName);
    }
  }
  getItem(menu){
    console.log(menu,"123122");
    
    return ViewUtil.getMenuItem(()=>this.onHandlerClick(menu),menu,THEME_COLOR);
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
          <ScrollView>
            <TouchableOpacity
              style={styles.item}
              onPress={() =>this.onHandlerClick(
                MORE_MENU.About
              )}>
                <View style={styles.about_left}>

                  <Ionicons
                    name={MORE_MENU.About.icon}
                    size={40}
                    style={{marginRight:10,color:THEME_COLOR}}
                  />
                  <Text>GitHub Popular</Text>
                </View>
                  <Ionicons
                    size={16}
                    name={"ios-arrow-forward"}
                    style={{marginRight:10,color:THEME_COLOR,
                    alignSelf:"center"}}
                  />
            </TouchableOpacity>
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Tutorial)}
            <Text style={styles.groupTitle}>趋势管理</Text>
            {/* 自定义语言 */}
            {this.getItem(MORE_MENU.Custom_Language)}
            {/* 语言排序 */}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Sort_Language)}
            {/* 最热管理 */}
            <Text style={styles.groupTitle}>最热管理</Text>
            {this.getItem(MORE_MENU.Custom_Key)}
            {/* 标签排序 */}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.Remove_Key)}
            {/* 设置 */}
            <Text style={styles.groupTitle}>设置</Text>
            {/* 自定义主题 */}
            {this.getItem(MORE_MENU.Custom_Theme)}
            {/* 关于作者 */}
            <View style={GlobalStyles.line}/>
            {this.getItem(MORE_MENU.About_Author)}
            <View style={GlobalStyles.line}/>
            {/* 反馈 */}
            {this.getItem(MORE_MENU.Feedback)}
          </ScrollView>
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
  about_left:{
    alignItems:"center",
    flexDirection:'row'
  },
  item:{
    backgroundColor:"white",
    padding:10,
    height:60,
    alignItems:"center",
    fontSize: 30,
    justifyContent:"space-between",
    flexDirection:'row'
  },
  groupTitle:{
    marginLeft:10,
    marginTop:10,
    marginBottom:5,
    fontSize:12,
    color:'gray'
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
