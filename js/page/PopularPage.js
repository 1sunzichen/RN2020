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
import NavigationBarDiy from '../common/NavigationBar';
import FavoriteDao from '../expand/dao/FavoriteDao.js';
import {FALG_STORAGE} from '../expand/dao/dataStore.js';
import EventBus from 'react-native-event-bus';
import EventTypes from '../util/EventTypes.js';
import FavoriteUtil from "../util/FavoriteUtil.js"
const URL=`https://api.github.com/search/repositories?q=`;
const QUERY_STR="&sort=stars";
const THEME_COLOR='#678';
const favoriteDao=new FavoriteDao(FALG_STORAGE.flag_popular);
//console.log(favoriteDao,"favoriteDaofavoriteDaofavoriteDao");

const pageSize=10;
type Props = {};
class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.TabNames = ['JAVA', 'Android', 'iOS', 'Flutter', 'ReactNative'];

  }
  _genTabs() {
    const Tabs = {};
    this.TabNames.map((item, index) => {
      Tabs[`tab${index}`] = {
        //传递参数 props => <PopularTab {...props} Tablabel={item} />,
        screen: props => <PopularTabPage {...props} tabLabel={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return Tabs;
  }

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
    const TabNavigator = createMaterialTopTabNavigator(this._genTabs(), {
      swipeEnabled:true,
      tabBarOptions: {
        upperCaseLabel: false,
        scrollEnabled: true, //是否滚动
        tabStyle: {
          //minWidth: 120,
          width:"auto",
          upperCaseLabel: false,
        },
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

class PopularTab extends Component<Props> {
  constructor(props){
      super(props);
      const {tabLabel}=this.props;
      
      this.storeName=tabLabel;
      // 页面通信标识
      this.isFavoriteChanged=false;
  }
  componentDidMount() {
    this.loadData();
    EventBus.getInstance().addListener(EventTypes.favorite_changed_popular, this.favoriteListener = () => {
     this.isFavoriteChanged=true;
    })
    EventBus.getInstance().addListener(EventTypes.bottom_tab_select, this.bottomTabSelectListener = (data) => {
      if(data.to===0&&this.isFavoriteChanged){
        this.loadData(null,true)
      }
    })
  }
  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.favoriteListener);
    EventBus.getInstance().removeListener(this.bottomTabSelectListener);
  }
  _store(){
    const {popular}=this.props;
  
    
    let store=popular[this.storeName];
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

    const {onLoadPopularData,onLoadMorePopular}=this.props;
    const store=this._store();
    const url=this.getFetchUrl(this.storeName);

    if(loadMore){
      onLoadMorePopular(this.storeName,++(store.pageIndex),pageSize,store.items,favoriteDao,callback=>{
        this.refs.toast.show("没有更多了")
      } );
    }else if(refresh){
      onFlushPopularFavoriteData(this.storeName,++(store.pageIndex),pageSize,store.items,favoriteDao)
    }
    else{
      onLoadPopularData(this.storeName,url,pageSize,favoriteDao);

    }
  }
  getFetchUrl(key){
    return URL+key+QUERY_STR;
  }
  goPage(item,callback){
 
    
    NavigationUtil.goPage({
              projectModel:item,
              flag:FALG_STORAGE.flag_popular,
              callback
            },'DetailPage')
  }
  renderItem(item){
   // const item=data.item;
      
    // return <View>
    //     <Text >{JSON.stringify(item)}</Text>
    // </View>
    return <PopularItem
          projectModel={item}
          onSelect={(callback)=>{
           this.goPage(item,callback)
          }}
          //传入 favoriteDao 方法 存贮 或 移除 项目 
          onFavorite={(item,isFavorite)=>FavoriteUtil.onFavorite(favoriteDao,item,isFavorite,FALG_STORAGE.flag_popular)}

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
    const {popular} = this.props;

    let store=this._store();
    //console.log(store,"zuireStore");
    
    return (
      <View style={styles.sectionContainerTab}>
        <FlatList
          data={store.projectModels}
          renderItem={({item})=>this.renderItem(item)}
          keyExtractor={item => "" + item.item.id}
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
            // //console.log('====================================');
            // //console.log('---ononMomentumScrollBegin');
            // //console.log('====================================');
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
  popular:state.popular,
})
// action 请求的方法

const mapDispatchToProps=dispatch=>({
  onLoadPopularData:(storeName,url,pageSize,favoriteDao)=>dispatch(Actions.onLoadPopularData(storeName,url,pageSize,favoriteDao)),
  onLoadMorePopular:(storeName,pageIndex,pageSize,items,favoriteDao,callback)=>dispatch(Actions.onLoadMorePopularData(storeName,pageIndex,pageSize,items,favoriteDao,callback)),
  onFlushPopularFavoriteData:(storeName,pageIndex,pageSize,items,favoriteDao)=>dispatch(Actions.onFlushPopularFavorite(storeName,pageIndex,pageSize,items,favoriteDao))
})
const PopularTabPage=connect(mapStateToProps,mapDispatchToProps)(PopularTab);

export default PopularPage;
