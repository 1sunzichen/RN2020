/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigators/navigationUtil';
import {View, Text, StyleSheet, Button,FlatList,
// 刷新         加载小圆圈
RefreshControl,ActivityIndicator,ScrollView} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
// 视频老师的插件 ***
import Toast from 'react-native-easy-toast';
import Actions from '../action';
import PopularItem from '../common/PopularItem.js';
import NavigationBarDiy from '../common/NavigationBar';
import FavoriteDao from '../expand/dao/FavoriteDao.js';
import {FALG_STORAGE} from '../expand/dao/dataStore.js';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes.js';
import FavoriteUtil from "../util/FavoriteUtil.js";
import {FLAG_LANGUAGE} from '../expand/dao/LanguageDao.js';
const URL=`https://api.github.com/search/repositories?q=`;
const QUERY_STR="&sort=stars";
const THEME_COLOR='#678';
const favoriteDao=new FavoriteDao(FALG_STORAGE.flag_popular);
//console.log(favoriteDao,"favoriteDaofavoriteDaofavoriteDao");

const pageSize=10;
type Props = {};
class CustomKeyPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params=this.props.navigation.state.params;
    this.backPress=new BackPressComponent({backPress:()=>this.onBackPress()})
    //this.TabNames = ['JAVA', 'Android', 'iOS', 'Flutter', 'ReactNative'];
    this.changeValues=[];
    this.isRemoteKey=!!this.params.isRemoteKey;
    this.languageDao=new LanguageDao(this.params.flag);
    this.state={
      keys:[]
    }
  }
  onBackPress(){
    NavigationUtil.resetBack(this.props);
    return true;
  }

  componentDidMount() {
    this.backPress.componentDidMount();

    if(CustomKeyPage._keys(this.props).length===0){
      let {onLoadLanguage}=this.props;
      onLoadLanguage(this.params.flag);
    }
    this.setState({
      keys:CustomKeyPage._keys(this.props)
    })
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }
  //获取标签
  static _keys(props,original,state){
    const {flag,isRemoteKey}=props.navigation.state.params;
    let key=flag===FLAG_LANGUAGE.flag_key?"keys":"languages";
    if(isRemoteKey&&!original){

    }else{
      return props.language[key];
    }
  }

  _genTabs() {
    const Tabs = {};
    const {keys}=this.props;
    console.log(this.props,"11111");
    
    keys.map((item, index) => {
      //选中的显示出来
      if(item.checked){

        Tabs[`tab${index}`] = {
          //传递参数 props => <PopularTab {...props} Tablabel={item} />,
          screen: props => <PopularTabPage {...props} tabLabel={item} />,
          navigationOptions: {
            //数据结构 显示name
            title: item.name,
          },
        };
      }
    });
    return Tabs;
  }
  renderView(){
    let dataArray=this.state.keys;
    if(!dataArray||dataArray.length===0) return;
    let len=dataArray.length;
    let views=[];
    for(let i=0,l=len;i<l;i+=2){
      views.push(
        <View key={i}>
           <View style={styles.item}>
              <View style={styles.line}/>
           </View>
        </View>
      )
    }
  }
  onSave(){

  }
  render() {
    let title=this.isRemoteKey?'标签移除':'自定义标签';
    title=this.params.flag===FLAG_LANGUAGE.flag_language?"自定义语言":title;
    let rightButtonTitle=this.isRemoveKey?'移除':'保存';
    let barHot=<NavigationBarDiy
          title={title}
          style={{backgroundColor:THEME_COLOR}}
          rightButton={ViewUtil.getRightButton(rightButtonTitle,()=>this.onSave())}
    />
  
 
    return (<View style={styles.container}>
            
         {barHot}
        <ScrollView>
          {this.renderView()}
        </ScrollView>
    </View>)
  }
}
const mapStateToPropsPage=state=>({
  lauguage:state.lauguage,
})
// action 请求的方法

const mapDispatchToPropsPage=dispatch=>({
  onLoadLanguage:(flag)=>dispatch(Actions.onLoadLanguage(flag)),

})
export default connect(mapStateToPropsPage,mapDispatchToPropsPage)(CustomKeyPage);

const styles=StyleSheet.create({
  container: {
    flex: 1
  },
  item:{
    flexDirection:'row'
  },
  line:{
    
  }
})

