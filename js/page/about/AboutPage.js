/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View,Text,Linking} from 'react-native';

import {MORE_MENU} from '../../common/MORE_MENU.js';
import GlobalStyles from '../../res/GlobalStyles.js';
import ViewUtil from '../../util/viewUtil.js';
import NavigationUtil from '../../navigators/navigationUtil.js'
import AboutCommon,{FLAG_ABOUT} from './AboutCommon.js';
import config from './github_config.json';
const THEME_COLOR="#678";
type Props = {};
export default class  AboutPage extends Component<Props>{
  
   constructor(props){
     super(props);
     this.params=this.props.navigation.state.params;
     this.aboutCommon=new AboutCommon({
       //props 传递
       ...this.params,
       navigation:this.props.navigation,
       flagAbout:FLAG_ABOUT.flag_about,

     },
     // 更新state 数据
     data=>this.setState({...data})
     );
     this.state={
       data:config
     }
   }

  onHandlerClick(menu){
    let RouteName,params={};
    switch(menu){
      case MORE_MENU.Tutorial:
        //跳转到 教程页
        RouteName='WebViewPage';
        params.title="教程";
        params.url="https://www.9xkd.com/1914210302.html";
      break;
      case MORE_MENU.About_Author:
      RouteName='AboutMePage';
      break;
      case MORE_MENU.Feedback:
      const url="mailto://15210187668@163.com";
      Linking.canOpenURL(url)
      .then(support=>{
          if(!support){
            console.log('Can\'t handle url:'+url);
            
          }else{
            Linking.openURL(url);
          }
      })
      .catch(e=>{
        console.error('An error occurred:',e);
        
      })
      break;
    }
    if(RouteName){
      NavigationUtil.goPage(params,RouteName);
    }
  }

  getItem(menu){
    return ViewUtil.getMenuItem(()=>this.onHandlerClick(menu),menu,THEME_COLOR);
  }
  render(){
  //   
    console.log(this.state.data.app,"000pp");
    
    const content=<View>
     {this.getItem(MORE_MENU.Tutorial)}
      <View style={GlobalStyles.line}/>
     {this.getItem(MORE_MENU.About_Author)}
      <View style={GlobalStyles.line}/>
     {this.getItem(MORE_MENU.Feedback)}
    
    </View>
    return this.aboutCommon.renderOOO(content,this.state.data.app)
  }
}


