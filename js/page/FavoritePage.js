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
RefreshControl,ActivityIndicator} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {connect} from 'react-redux';
// 视频老师的插件 ***
import Toast from 'react-native-easy-toast';
import Actions from '../action';
import PopularItem from '../common/PopularItem.js';
import TrendingItem from '../common/TrendingItem.js';
import NavigationBarDiy from '../common/NavigationBar';
import FavoriteDao from '../expand/dao/FavoriteDao.js';
import {FALG_STORAGE} from '../expand/dao/dataStore.js';
import FavoriteUtil from "../util/FavoriteUtil.js"
const URL=`https://api.github.com/search/repositories?q=`;
const QUERY_STR="&sort=stars";
const THEME_COLOR='#678';
const favoriteDao=new FavoriteDao(FALG_STORAGE.flag_popular);
console.log(favoriteDao,"favoriteDaofavoriteDaofavoriteDao");

const pageSize=10;
type Props = {};
class FavoritePage extends Component<Props> {
  constructor(props) {
    super(props);
    this.TabNames = ['JAVA', 'Android', 'iOS', 'React', 'ReactNative'];

  }
  // _genTabs() {
  //   const Tabs = {};
  //   this.TabNames.map((item, index) => {
  //     Tabs[`tab${index}`] = {
  //       //传递参数 props => <PopularTab {...props} Tablabel={item} />,
  //       screen: props => <FavoriteTabPage {...props} tabLabel={item} />,
  //       navigationOptions: {
  //         title: item,
  //       },
  //     };
  //   });
  //   return Tabs;
  // }

  render() {
    let statusBar={
      backgroundColor:THEME_COLOR,
      barStyle:'light-content'
    }
    let barHot=<NavigationBarDiy
          title="最热"
          statusBar={statusBar}
          style={{backgroundColor:THEME_COLOR}}
    />
    const TabNavigator = createMaterialTopTabNavigator({
      'Popular':{
        //传递参数 props => <PopularTab {...props} Tablabel={item} />,
        screen: props => <FavoriteTabPage {...props} flag={FALG_STORAGE.flag_popular}  />,
        navigationOptions: {
          title: '最热',
        },
      },
      'trending':{
        //传递参数 props => <PopularTab {...props} Tablabel={item} />,
        screen: props => <FavoriteTabPage {...props} flag={FALG_STORAGE.flag_trending} />,
        navigationOptions: {
          title: "趋势",
        },
      },
    }, {
      swipeEnabled:true,
      tabBarOptions: {
        upperCaseLabel: false,
        // scrollEnabled: true, //是否滚动
        style: {
          // paddingTop:20,
          backgroundColor: '#567',
          height:50
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
    const Tab = createAppContainer(TabNavigator);
    return (<View style={{flex:1}}>
            
         {barHot}
          <Tab style={styles.sectionContainerTab} />
         
    </View>)
  }
}

class FavoriteTab extends Component<Props> {
  constructor(props){
      super(props);
      const {flag}=this.props;
      
      this.storeName=flag;
      this.favoriteDao=new FavoriteDao(flag);
  }
  componentDidMount() {
    this.loadData();
  }
  _store(){
    const {favorite}=this.props;
  
    
    let store=favorite[this.storeName];
    if(!store){
      store={
        items:[],
        isLoading:false,
        projectModels:[],
    
      }
    }
    return store;
  }
  loadData(isShowLoading){

    const {onLoadFavoriteData}=this.props;
    onLoadFavoriteData(this.storeName,isShowLoading);
  }
  // getFetchUrl(key){
  //   return URL+key+QUERY_STR;
  // }
  goPage(item,callback){
 
    
    NavigationUtil.goPage({
              projectModel:item,
              flag:this.storeName,
              callback
            },'DetailPage')
  }
  renderItem(item){
   // const item=data.item;
      
    // return <View>
    //     <Text >{JSON.stringify(item)}</Text>
    // </View>
    const Item=this.storeName===FALG_STORAGE.flag_trending?TrendingItem:PopularItem;
    return <Item
          projectModel={item}
          onSelect={(callback)=>{
           this.goPage(item,callback)
          }}
          //传入 favoriteDao 方法 存贮 或 移除 项目 
          onFavorite={(item,isFavorite)=>FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,this.storeName)}

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
    const {favorite} = this.props;

    let store=this._store();
    console.log(store,"zuireStore");
    
    return (
      <View style={styles.sectionContainerTab}>
        <FlatList
          data={store.projectModels}
          renderItem={({item})=>this.renderItem(item)}
          keyExtractor={({item})=>(""+(item.id||item.fullName))}
          refreshControl={
            <RefreshControl
              title={"loading"}
              titleColoe={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={()=>this.loadData(true)}
            />
          }
        
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
  favorite:state.favorite,
})
// action 请求的方法

const mapDispatchToProps=dispatch=>({
  onLoadFavoriteData:(storeName,isShowLoading)=>dispatch(Actions.onLoadFavoriteData(storeName,isShowLoading)),

})
const FavoriteTabPage=connect(mapStateToProps,mapDispatchToProps)(FavoriteTab);

export default FavoritePage;
