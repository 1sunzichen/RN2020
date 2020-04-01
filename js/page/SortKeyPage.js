/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import SortableListView from 'react-native-sortable-listview'
import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigators/navigationUtil';
import {View, Text, StyleSheet, Button,FlatList,
// 刷新         加载小圆圈
RefreshControl,ActivityIndicator,ScrollView,Alert,TouchableHighlight,TouchableOpacity,
Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-view';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Checkbox from 'react-native-check-box';
import BackPressComponent from '../common/BackPressComponent.js';
//拖拽 组件
import {DragSortableView} from 'react-native-drag-sort';
const URL=`https://api.github.com/search/repositories?q=`;
const QUERY_STR="&sort=stars";
const THEME_COLOR='#678';
const favoriteDao=new FavoriteDao(FALG_STORAGE.flag_popular);
//console.log(favoriteDao,"favoriteDaofavoriteDaofavoriteDao");
import OrderFlatList from 'react-native-order-flat-list';
const pageSize=10;
type Props = {};
const {width} = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width - 20
const childrenHeight = 48
class SortKeyPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params=this.props.navigation.state.params;
    this.backPress=new BackPressComponent({backPress:()=>this.onBackPress()})
    //this.TabNames = ['JAVA', 'Android', 'iOS', 'Flutter', 'ReactNative'];
   
  
    this.languageDao=new LanguageDao(this.params.flag);
    console.log(this.props,"checkedArray");
    
    this.state={
      //初始化 获取
      checkedArray:SortKeyPage._keys(this.props)
    }
  }
  //
 static getDerivedStateFromProps(nextProps, prevState) {
        const checkedArray = SortKeyPage._keys(nextProps, null, prevState);
        console.log(checkedArray,'checkedArray2');
        
        if (prevState.keys !== checkedArray) {
            return {
                checkedArray: checkedArray,
            }
        }
        return null;
    }
  onBackPress(){
    if(!ArrayUtil.isEqual(SortKeyPage._keys(this.props), this.state.checkedArray)){
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



  componentDidMount() {
        this.backPress.componentDidMount();
        //如果props中标签为空则从本地存储中获取标签
        if (SortKeyPage._keys(this.props).length === 0) {
            let {onLoadLanguage} = this.props;
            onLoadLanguage(this.params.flag);
        }
    }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }
  //获取标识
  static _flag(props){
    const {flag}=props.navigation.state.params;
    return flag===FLAG_LANGUAGE.flag_key?"keys":"languages";
  }
  //获取标签   original bool  state props 数据
   static _keys(props, state) {
        //如果state中有checkedArray则使用state中的checkedArray
        if (state && state.checkedArray && state.checkedArray.length) {
            return state.checkedArray;
        }
        //否则从原始数据中获取checkedArray
        const flag = SortKeyPage._flag(props);
        let dataArray = props.language[flag] || [];
        let keys = [];
        for (let i = 0, j = dataArray.length; i < j; i++) {
            let data = dataArray[i];
            if (data.checked) keys.push(data);
        }
        return keys;
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
  //获取排序后的数据
  //更新本地数据
  onSave(hasChecked){
    if(!hasChecked){
      //如果没有进行排序 直接返回
      if(ArrayUtil.isEqual(SortKeyPage._keys(this.props),this.state.checkedArray)){
        NavigationUtil.resetBack(this.props);
        return;
      }
    }
    //@todo 保存排序后的数据
    //获取排序后的数据
    //更新本地数据
    this.languageDao.save(this.getSortResult());
    const {onLoadLanguage}=this.props;
    //更新store
    onLoadLanguage(this.params.flag);
    NavigationUtil.resetBack(this.props);

  }
  //获取排序后的标签结果 
  getSortResult(){
    const flag=SortKeyPage._flag(this.props);
    //从原始数据 中复制一份数据出来
    let sortResultArray=ArrayUtil.clone(this.props.language[flag]);
    //获取排序之前的排列顺序
    const originalCheckArray=SortKeyPage._keys(this.props);
    //遍历排序之前的数据 用排序后的数据checkArray进行替换
    for(let i=0,j=originalCheckArray.length;i<j;i++){
      let item=originalCheckArray[i];
      //找到替换元素所在位置
      let index=this.props.language[flag].indexOf(item);
      sortResultArray.splice(index,1,this.state.checkedArray[i])
    }
    return sortResultArray;
  }


  renderItem(item,index){
    return(
      <View style={styles.item_children}>
      <TouchableHighlight
            // underlayColor={'#eee'}
           
            style={item.checked ? styles.item : styles.hidden}
            >
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <MaterialCommunityIcons
                    name={'sort'}
                    size={16}
                    style={{marginRight: 10, color: THEME_COLOR}}/>
                <Text>{item.name}</Text>
            </View>
        </TouchableHighlight>
      </View>
    )
  }
  
  render() {
    //flag_lauguage
   let title=this.params.flag===FLAG_LANGUAGE.flag_language?"语言排序":"标签排序";
   
    let order=Object.keys(this.state.checkedArray);
    console.log(this.state.checkedArray,"this.state.checkedArray",order);
    
    let barHot=<NavigationBarDiy
          title={title}
          style={{backgroundColor:THEME_COLOR}}
          leftButton={ViewUtil.getLeftButton(()=>{
            this.onBackPress()
          })}
          rightButton={ViewUtil.getRightButton("保存",()=>this.onSave())}
    />
    return (<View>
            
          {barHot}
          <SortableListView
                data={this.state.checkedArray}
                order={Object.keys(this.state.checkedArray)}
                onRowMoved={e => {
                    order.splice(e.to, 0, order.splice(e.from, 1)[0])
                    this.forceUpdate()
                }}
                renderRow={row => <SortCell data={row} {...this.params}/>}
            />
          
      </View>)
  }
}
class SortCell extends Component {
    render() {
     
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked ? styles.item : styles.hidden}
            {...this.props.sortHandlers}>
            <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <MaterialCommunityIcons
                    name={'sort'}
                    size={16}
                    style={{marginRight: 10, color: THEME_COLOR}}/>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}

const mapStateToPropsPage=state=>({
  language:state.language,
})
// action 请求的方法

const mapDispatchToPropsPage=dispatch=>({
  onLoadLanguage:(flag)=>dispatch(Actions.onLoadLanguage(flag)),

})
export default connect(mapStateToPropsPage,mapDispatchToPropsPage)(SortKeyPage);
const styles=StyleSheet.create({
  item:{
    backgroundColor:"#f8f8f8",
    borderBottomWidth:1,
    borderColor:'#eee',
    height:50,
    justifyContent:'center'
  },
  hidden:{
    height:0
  },
   container: {
    flex: 1,
    justifyContent: 'center',
    
  },

    itemOne: {
        width: childrenWidth,
        height: childrenHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item_children: {
        width: childrenWidth,
        height: childrenHeight-4,
      
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    item_icon: {
        width: childrenHeight*0.6,
        height: childrenHeight*0.6,
        marginLeft: 15,
        resizeMode: 'contain',
    },
    item_text: {
        marginRight: 15,
        color: '#2ecc71'
    }
 
})

