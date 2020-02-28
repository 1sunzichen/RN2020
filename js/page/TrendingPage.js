/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigators/navigationUtil';
import {View, Text, StyleSheet, Button,FlatList,
TouchableOpacity,
DeviceEventEmitter,
// 刷新         加载小圆圈
RefreshControl,ActivityIndicator} from 'react-native';
import TrendingDialog,{TimeSpans} from '../common/TrendingDialog';
import {createAppContainer} from 'react-navigation';
// 视频老师的插件 ***
import Toast from 'react-native-easy-toast';
import Actions from '../action';
import TrendingItem from '../common/TrendingItem.js';
import NavigationBarDiy from '../common/NavigationBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FavoriteDao from '../expand/dao/FavoriteDao.js';
import FavoriteUtil from "../util/FavoriteUtil";
import {FALG_STORAGE} from '../expand/dao/dataStore.js';
import {FLAG_LANGUAGE} from '../expand/dao/LanguageDao.js';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes.js';
//判断数据是否相等
import ArrayUtil from '../util/ArrayUtil.js'
//TimeSpans
const URL=`https://github.com/trending/`;
const QUERY_STR="?since=daily";
const THEME_COLOR='#678';
const pageSize=10;
const favoriteDao=new FavoriteDao(FALG_STORAGE.flag_trending);
type Props = {};
class TrendingPage2 extends Component<Props> {
  constructor(props) {
    super(props);
    const {onLoadLanguage}=this.props;
    onLoadLanguage(FLAG_LANGUAGE.flag_lauguage);
    //this.TabNames = [ 'C','python','asp','JavaScript','vue','rust'];
    this.state={
      timeSpan:TimeSpans[0],
 
    }
    this.ShowTime=this.ShowTime.bind(this);
    this.prevlanguages=[];
  }
  _genTabs() {
    const Tabs = {};
    const {languages}=this.props;

    this.prevlanguages=languages;
    languages.map((item, index) => {
      if(item.checked){
        Tabs[`tab${index}`] = {
          //传递参数 props => <PopularTab {...props} Tablabel={item} />,
          screen: props => <TrendingPage {...props} {...this.props} timeSpan={this.state.timeSpan}   tabLabel={item} />,
          navigationOptions: {
            title: item.name,
          },
        };
      }
    });
    return Tabs;
  }
 

  ShowTime(){

   if(this.refs.TrendingDialogRef.show){
     let a=this.refs.TrendingDialogRef.__proto__;
     //console.log(this.refs.TrendingDialogRef,a,"0000");
     this.refs.TrendingDialogRef.show();
   }
    
    
     // this.myRef.current.state.visable=true;
    
    //this.myRef.current.show();
  }

  renderTitleView(){
    //console.log('====================================');
    //console.log(this.myRef,"1212");
    //console.log('====================================');
    return <View style={styles.style_renderTitleView}>
      <TouchableOpacity
        underlayColor="red"
        onPress={this.ShowTime}
       
        >
        <View style={{flexDirection:"row",alignItems:"center",
          padding:5}}>
          <Text style={{
            fontSize:18,
            color:"#fff",
            fontWeight:'400'
          }}>
            趋势{this.state.timeSpan.showText}
          </Text>
          <MaterialIcons
            name={"arrow-drop-down"}
            size={22}
            style={{color:'white'}}
          />
        </View>
      </TouchableOpacity>
    </View>
  }
  onSelectTimeSpan(tab){
    this.refs.TrendingDialogRef.dismiss();
    this.setState({
       timeSpan:tab
    })
    DeviceEventEmitter.emit("TIME_CHANGE",tab)
  }
  renderTrendingDialog(){
    return <TrendingDialog
      onSelect={tab=>this.onSelectTimeSpan(tab)}
      ref={"TrendingDialogRef"}
    />
    
  }
  _tavNav(){
    if(!this.tabNavC||!ArrayUtil.isEqual(this.prevlanguages,this.props.languages)){
      
    let tabNavi = createMaterialTopTabNavigator(this._genTabs(), {
      swipeEnabled:true,
      tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: true, //是否滚动
        tabStyle: {
          width:"auto",
          upperCaseLabel: false,
        },
        style: {
          height:50,
          backgroundColor: '#567',
        },
        indicatorStyle: {
          height: 2,
          backgroundColor: '#456',
        }, //标签指示器的样式
        labelStyle: {
          fontSize: 23,
        }, //文件样式
      },
    });
         this.tabNavC=createAppContainer(tabNavi);
    }
    return  this.tabNavC;
  }
  render() {
    let statusBar={
      backgroundColor:THEME_COLOR,
      barStyle:'light-content'
    }

    
    let barHot=<NavigationBarDiy
          title="趋势"
          statusBar={statusBar}
          titleView={this.renderTitleView()}
          style={{backgroundColor:THEME_COLOR}}
    />

  
    const Tab = this._tavNav();
    return (<View style={{flex:1}}>
            
         {barHot}
        <Tab style={styles.sectionContainerTab} />
        {this.renderTrendingDialog()}
        
    </View>)
  }
}

class TrendingTab extends Component<Props> {
  constructor(props){
      super(props);
      let {tabLabel,timeSpan}=this.props;
      this.timeSpan=timeSpan;
      this.storeName=tabLabel;
      this.isFavoriteChanged=false;
  }
  componentDidMount() {
    this.loadData();
    this.Listener=DeviceEventEmitter.addListener("TIME_CHANGE",(timeSpan)=>{
      this.timeSpan=timeSpan;
      this.loadData();
    })
    EventBus.getInstance().addListener(EventTypes.favorite_changed_trending, this.favoriteListener = () => {
     this.isFavoriteChanged=true;
    })
    EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
      if(data.to===1&&this.isFavoriteChanged){
        this.loadData(null,true)
      }
    })
  }
  componentWillUnmount() {
    if(this.Listener){
      this.Listener.remove();
    }
    EventBus.getInstance().removeListener(this.favoriteListener);
    EventBus.getInstance().removeListener(this.bottomTabSelectListener);
  }
  _store(){
    const {trending}=this.props;
  
    let store=trending[this.storeName];
    if(!store){
      store={
        items:[],
        isLoading:false,
        projectModels:[],
        hideLoadingMore:true,
        pageIndex:1,
      }
    }
    return store;
  }
  loadData(loadMore,refresh){

    const {onLoadTrendingData,onLoadMoreTrendingData}=this.props;
    const store=this._store();
    const url=this.getFetchUrl(this.storeName);

    
    if(loadMore){
      onLoadMoreTrendingData(this.storeName,++(store.pageIndex),pageSize,store.items,favoriteDao,callback=>{
        this.refs.toast.show("没有更多了")
      } );

    }else if(refresh){
      onFlushTrendingFavorite(this.storeName,++(store.pageIndex),pageSize,store.items,favoriteDao);
    }
    else{
 
      
      onLoadTrendingData(this.storeName,url,pageSize,favoriteDao);

    }
  }
  getFetchUrl(key){

    return URL+key+"?"+this.timeSpan.searchText;

  }
  renderItem(data){
    console.log(data,"trendData");
    
    const item=data.item;
    // return <View>
    //     <Text >{JSON.stringify(item)}</Text>
    // </View>
    return <TrendingItem
          projectModel={item}
          onSelect={(callback)=>{
            NavigationUtil.goPage({
              projectModel:item,
              flag:FALG_STORAGE.flag_trending,
              callback
            },'DetailPage')
          }}
          onFavorite={(item,isFavorite)=>FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FALG_STORAGE.flag_trending)}
    />
  }
  getIndic() {
    return this._store().hideLoadingMore?null:(
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size={'large'} animating={true} />
        <Text>正在加载更多...</Text>
      </View>
    );
  }
  render() {
    const {trending} = this.props;
    let store=this._store();
    //console.log(store.projectModels,"itemsss");
    
    return (
      <View style={styles.sectionContainerTab}>
        <FlatList
          data={store.projectModels}
          renderItem={data=>this.renderItem(data)}
          keyExtractor={item=>""+item.item.fullName}
          refreshControl={
            <RefreshControl
              title={"loading"}
              titleColoe={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={()=>this.loadData()}

            />
          }
          ListFooterComponent={()=>this.getIndic()}
          onEndReached={()=>{
            setTimeout(() => {
              if(this.canLoadMore){
                this.loadData(true)
                this.canLoadMore=false;
              }
            }, 100);
          }}
          
          onScrollBeginDrag={()=>{
            this.canLoadMore=true;
    
          }}
          onEndReachedThreshold={0.5}
        /> 
        <Toast ref={"toast"}
          position={"center"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainer:{
    alignItems:"center"
  },
  sectionContainerTab: {
    marginTop: 0,
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
// reducer 返回的数据
const mapStateToProps=state=>({
  trending:state.trending,


})
// action 请求的方法
const mapDispatchToProps=dispatch=>({
  onLoadTrendingData:(storeName,url,pageSize,favoriteDao)=>dispatch(Actions.onLoadTrendingData(storeName,url,pageSize,favoriteDao)),
  onLoadMoreTrendingData:(storeName,pageIndex,pageSize,items,favoriteDao,callback)=>dispatch(Actions.onLoadMoreTrendingData(storeName,pageIndex,pageSize,items,favoriteDao,callback)),
  onFlushTrendingFavorite:(storeName,pageIndex,pageSize,items,favoriteDao)=>dispatch(Actions.onFlushTrendingFavorite(storeName,pageIndex,pageSize,items,favoriteDao)),
 
})
const TrendingPage=connect(mapStateToProps,mapDispatchToProps)(TrendingTab);


//父组件
const mapStateToPropsPageTrend=state=>({
  languages:state.lauguage.languages,
})
// action 请求的方法
const mapDispatchToPropsPageTrend=dispatch=>({
  onLoadLanguage:(flag)=>dispatch(Actions.onLoadLanguage(flag)),

})
const TrendingPageWrap=connect(mapStateToPropsPageTrend,mapDispatchToPropsPageTrend)(TrendingPage2);
export default TrendingPageWrap;
