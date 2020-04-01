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
RefreshControl,ActivityIndicator,ScrollView,Alert} from 'react-native';
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
import ViewUtil from '../util/viewUtil.js';
import ArrayUtil from '../util/ArrayUtil.js';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao.js';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Checkbox from 'react-native-check-box';
import BackPressComponent from '../common/BackPressComponent.js';

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
    this.isRemoveKey=!!this.params.isRemoveKey;
    this.languageDao=new LanguageDao(this.params.flag);
    this.state={
      keys:[]
    }
  }
  //
  static getDerivedStateFromProps(nextProps,prevState){
    if(prevState.keys!==CustomKeyPage._keys(nextProps,null)){
        return{
          keys:CustomKeyPage._keys(nextProps,null,prevState)
        }
    }
    return null;
  }
  onBackPress(){
    if(this.changeValues.length>0){
        Alert.alert('提示','保存修改吗',[
          {
            text:'否',onPress:()=>{
               NavigationUtil.resetBack(this.props);
            }
          },
          {
             text:'是',onPress:()=>{
               this.onSave();
             }
          }
        ])
    }else{

    NavigationUtil.resetBack(this.props);
    }
    return true;
  }
  _checkedImage(checked){
    const {theme}=this.params;
    return <Ionicons
              name={checked?"ios-checkbox":'md-square-outline'}
              size={20}
              style={{
                color:THEME_COLOR
              }}
    />
  }
  onClick(data,index){
        data.checked=!data.checked;
        ArrayUtil.updateArray(this.changeValues,data);
        this.state.keys[index]=data;//更新state 以便显示选中状态
        this.setState({
          keys:this.state.keys
        })
  }
  renderCheckBox(data,index){

    return <Checkbox
      style={{flex:1,padding:10}}
      onClick={()=>this.onClick(data,index)}
      isChecked={data.checked}
      leftText={data.name}
      checkedImage={this._checkedImage(true)}
      unCheckedImage={this._checkedImage(false)}

    />
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
  //获取标签   original bool  state props 数据
  static _keys(props,original,state){
    const {flag,isRemoveKey}=props.navigation.state.params;
    let key=flag===FLAG_LANGUAGE.flag_key?"keys":"languages";
    //如果是标签移除  重置非选中状态 和  
    // 当前keys  存在 就取 当前的 keys 默认进来 所有的keys ；
    // 不存在 取 所有的keys
    if(isRemoveKey&&!original){
       //如果state中的keys为空则从props中取
            return state && state.keys && state.keys.length !== 0 && state.keys || props.language[key].map(val => {
                return {//注意：不直接修改props，copy一份
                    ...val,
                    checked: false
                };
            });
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
    // 一排显示2个 复选框
    for(let i=0,l=len;i<l;i+=2){
      views.push(
        <View key={i}>
           <View style={styles.item}>
           {this.renderCheckBox(dataArray[i],i)}
           {i+1 < len && this.renderCheckBox(dataArray[i+1],i+1)}
              <View style={styles.line}/>
           </View>
        </View>
      )
    }
    return views;
  }
  onSave(){
    if(this.changeValues.length===0){
       NavigationUtil.resetBack(this.props);
      return;
    }
    let keys;
    if(this.isRemoveKey){
      for(let i=0,l=this.changeValues.length;i<l;i++){
        ArrayUtil.remove(keys=CustomKeyPage._keys(this.props,true),this.changeValues[i],"name")
      }
    }
    
    //更新本地数据
    this.languageDao.save(keys||this.state.keys);
    const {onLoadLanguage}=this.props;
    //更新store
    onLoadLanguage(this.params.flag);
    NavigationUtil.resetBack(this.props);

  }
  render() {
    let title=this.isRemoveKey?'标签移除':'自定义标签';//flag_lauguage
    title=this.params.flag===FLAG_LANGUAGE.flag_language?"自定义语言":title;
    console.log(title,"title111",this.params.flag,FLAG_LANGUAGE.flag_language)
    let rightButtonTitle=this.isRemoveKey?'移除':'保存';
    let barHot=<NavigationBarDiy
          title={title}
          style={{backgroundColor:THEME_COLOR}}
          leftButton={ViewUtil.getLeftButton(()=>{
            this.onBackPress()
          })}
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
  language:state.language,
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

