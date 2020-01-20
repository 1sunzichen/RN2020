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
const URL=`https://api.github.com/search/repositories?q=`;
const QUERY_STR="&sort=stars";
const THEME_COLOR='red';
const pageSize=10;
type Props = {};
class PopularPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.TabNames = ['JAVA', 'Android', 'iOS', 'React', 'ReactNative'];
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
    const TabNavigator = createMaterialTopTabNavigator(this._genTabs(), {
      swipeEnabled:true,
      tabBarOptions: {
        upperCaseLabel: false,
        scrllEnabled: false, //是否滚动
        tabStyle: {
          minWidth: 120,
          width:"auto",
          upperCaseLabel: false,
        },
        style: {
          paddingTop: 32,
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
    return <Tab style={styles.sectionContainerTab} />;
  }
}

class PopularTab extends Component<Props> {
  constructor(props){
      super(props);
      const {tabLabel}=this.props;
      
      this.storeName=tabLabel;
  }
  componentDidMount() {
    this.loadData();
  }
  _store(){
    const {popular}=this.props;
    let store=popular[this.storeName];
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

    const {onLoadPopularData,onLoadMorePopular}=this.props;
    const store=this._store();
    const url=this.getFetchUrl(this.storeName);
    console.log('====================================');
    console.log(this.storeName,"🐯",store);
    console.log('====================================');
    if(loadMore){
      onLoadMorePopular(this.storeName,++(store.pageIndex),pageSize,store.items,callback=>{
        this.refs.toast.show("没有更多了")
      } );

    }else{
      onLoadPopularData(this.storeName,url,pageSize);

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
    return <PopularItem
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
    const {popular} = this.props;
    console.log('====================================');
    console.log(popular,this.storeName,'🐂');
    console.log('====================================');
    let store=this._store();
    return (
      <View style={styles.sectionContainerTab}>
        <FlatList
          data={store.projectModes}
          renderItem={data=>this.renderItem(data)}
          keyExtractor={item=>""+item.id}
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
            console.log('====================================');
            console.log('---ononMomentumScrollBegin');
            console.log('====================================');
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
  onLoadPopularData:(storeName,url,pageSize)=>dispatch(Actions.onLoadPopularData(storeName,url,pageSize)),
  onLoadMorePopular:(storeName,pageIndex,pageSize,items,callback)=>dispatch(Actions.onLoadMorePopularData(storeName,pageIndex,pageSize,items,callback)),
})
const PopularTabPage=connect(mapStateToProps,mapDispatchToProps)(PopularTab);

export default PopularPage;
