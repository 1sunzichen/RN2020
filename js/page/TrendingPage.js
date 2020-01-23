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
import TrendingItem from '../common/TrendingItem.js';
import NavigationBarDiy from '../common/NavigationBar';
const URL=`https://github.com/trending/`;
const QUERY_STR="?since=daily";
const THEME_COLOR='#678';
const pageSize=10;
type Props = {};
class TrendingPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.TabNames = [ 'C','python','css','rust','JavaScript','vue'];
  }
  _genTabs() {
    const Tabs = {};
    this.TabNames.map((item, index) => {
      Tabs[`tab${index}`] = {
        //传递参数 props => <PopularTab {...props} Tablabel={item} />,
        screen: props => <TrendingTabPage {...props} tabLabel={item} />,
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
          title="趋势"
          statusBar={statusBar}
          style={{backgroundColor:THEME_COLOR}}
    />
    const TabNavigator = createMaterialTopTabNavigator(this._genTabs(), {
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
    const Tab = createAppContainer(TabNavigator);
    return (<View style={{flex:1}}>
            
         {barHot}
          <Tab style={styles.sectionContainerTab} />
         
    </View>)
  }
}

class TrendingTab extends Component<Props> {
  constructor(props){
      super(props);
      const {tabLabel}=this.props;
      
      this.storeName=tabLabel;
  }
  componentDidMount() {
    this.loadData();
  }
  _store(){
    const {trending}=this.props;
    console.log('====================================');
    console.log(trending,'abc');
    console.log('====================================');
    let store=trending[this.storeName];
    if(!store){
      store={
        items:[],
        isLoading:false,
        projectModes:[],
        hideLoadingMore:true,
        pageIndex:1,
      }
    }
    return store;
  }
  loadData(loadMore){

    const {onLoadTrendingData,onLoadMoreTrendingData}=this.props;
    const store=this._store();
    const url=this.getFetchUrl(this.storeName);

    if(loadMore){
      onLoadMoreTrendingData(this.storeName,++(store.pageIndex),pageSize,store.items,callback=>{
        this.refs.toast.show("没有更多了")
      } );

    }else{
      onLoadTrendingData(this.storeName,url,pageSize);

    }
  }
  getFetchUrl(key){

    return URL+key+QUERY_STR;

  }
  renderItem(data){

    const item=data.item;
    // return <View>
    //     <Text >{JSON.stringify(item)}</Text>
    // </View>
    return <TrendingItem
          item={item}
          onSelect={()=>{

          }}
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
    console.log('====================================');
    console.log(store.projectModes,"meile");
    console.log('====================================');
    return (
      <View style={styles.sectionContainerTab}>
        <FlatList
          data={store.projectModes}
          renderItem={data=>this.renderItem(data)}
          keyExtractor={item=>""+item.fullName}
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
  onLoadTrendingData:(storeName,url,pageSize)=>dispatch(Actions.onLoadTrendingData(storeName,url,pageSize)),
  onLoadMoreTrendingData:(storeName,pageIndex,pageSize,items,callback)=>dispatch(Actions.onLoadMoreTrendingData(storeName,pageIndex,pageSize,items,callback)),
})
const TrendingTabPage=connect(mapStateToProps,mapDispatchToProps)(TrendingTab);

export default TrendingPage;
