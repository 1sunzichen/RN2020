/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
//                跳转邮箱  剪切板
import {View,Text,Linking,Clipboard} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MORE_MENU} from '../../common/MORE_MENU.js';
import GlobalStyles from '../../res/GlobalStyles.js';
import ViewUtil from '../../util/viewUtil.js';
import NavigationUtil from '../../navigators/navigationUtil.js'
import AboutCommon,{FLAG_ABOUT} from './AboutCommon.js';
import config from './github_config.json';
import Toast from 'react-native-easy-toast'
const THEME_COLOR="#678";
type Props = {};
export default class  AboutMePage extends Component<Props>{
  
   constructor(props){
     super(props);
     this.params=this.props.navigation.state.params;
     this.aboutCommon=new AboutCommon({
       //props 传递
       ...this.params,
       navigation:this.props.navigation,
       flagAbout:FLAG_ABOUT.flag_about_me,

     },
     // 更新state 数据
     data=>this.setState({...data})
     );
     this.state={
       data:config,
       showTutorial:true,
       showBlog:false,
       showQQ:false,
       showContact:false
     }
   }

  onHandlerClick(menu){
    if(!menu) return ;
    if (menu.url) {
            NavigationUtil.goPage({
                theme,
                title: menu.title,
                url: menu.url
            }, 'WebViewPage');
            return;
        }
    if (menu.account && menu.account.indexOf('@') > -1) {
            let url = 'mailto://' + menu.account;
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
            return;
        }
        if (menu.account) {
            Clipboard.setString(menu.account);
            this.toast.show(menu.title + menu.account + '已复制到剪切板。');
        }
  }

  getItem(menu){
    return ViewUtil.getMenuItem(()=>this.onHandlerClick(menu),menu,THEME_COLOR);
  }
  
  _item(item,isShow,key){
    return ViewUtil.getSettingItem(()=>{
      this.setState({
        [key]:!this.state[key],
        

      })
    },item.name, THEME_COLOR, Ionicons, item.icon, isShow ? 'ios-arrow-up' : 'ios-arrow-down')
  }
  //显示列表显示数据
  renderItem(dic,isShowAccount){
    if(!dic) return null;
    let views=[];
    for(let i in dic){
      let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
      views.push(
        <View key={i}>
          {ViewUtil.getSettingItem(()=>this.onHandlerClick(dic[i]),title,THEME_COLOR)}
          <View style={GlobalStyles.line}/>
        </View>
      )
    }
    return views;
  }
  render(){
  //   
    console.log(this.state.data.app,"000pp");
    
    const content=<View>
      {/* //控制显示状态 */}
      {this._item(this.state.data.aboutMe.Tutorial,this.state.showTutorial,'showTutorial')}
      <View style={GlobalStyles.line}/>
      {this.state.showTutorial ? this.renderItem(this.state.data.aboutMe.Tutorial.items) : null}
       {/* 显示数据 */}
      
      {this._item(this.state.data.aboutMe.Blog,this.state.showBlog,'showBlog')}
      <View style={GlobalStyles.line}/>
       {this.state.showBlog?this.renderItem(this.state.data.aboutMe.Blog.items):
      null}
       {this._item(this.state.data.aboutMe.QQ,this.state.showQQ,'showQQ')}
      <View style={GlobalStyles.line}/>
       {this.state.showQQ?this.renderItem(this.state.data.aboutMe.QQ.items):
      null}
       {this._item(this.state.data.aboutMe.Contact,this.state.showContact,'showContact')}
      <View style={GlobalStyles.line}/>
       {this.state.showContact?this.renderItem(this.state.data.aboutMe.Contact.items):
      null}
    
    
    </View>
    return (
      <View style={{flex: 1}}>
      {this.aboutCommon.renderOOO(content,this.state.data.author)}
         <Toast ref={toast => this.toast = toast}
                   position={'center'}
            />
      </View>
    )
  }
}


