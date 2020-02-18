/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, View, Text,TouchableOpacity,TextInput,DeviceInfo} from 'react-native';
import {WebView} from 'react-native-webview';
import NavigationBar from '../common/NavigationBar.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationUtil from '../navigators/navigationUtil.js';
import ViewUtil from '../util/viewUtil.js';
import FavoriteDao from '../expand/dao/FavoriteDao.js';
import BackPressComponent from '../common/BackPressComponent.js';

const TRENDING_URL='https://github.com/';
const THEME_COLOR='#678';
type Props = {};
export default class DetailPage extends Component<Props> {
  constructor(props) {
    super(props);
    this.params=this.props.navigation.state.params;
    // flag  趋势模块 或 最热模块
    const {projectModel,flag} =this.params;
    // if
    console.log(this.params,"params111");
    
    this.favoriteDao=new FavoriteDao(flag);
    this.url=projectModel.item.html_url||TRENDING_URL+projectModel.item.fullName;
    const title=projectModel.item.full_name||projectModel.item.fullName;
    this.state = {
      title:title,
      url:this.url,
      canGoBack:false,
      isFavorite:projectModel.isFavorite
    }
    this.backPress=new BackPressComponent({backPress:this.onBackPress})
  }
  componentDidMount() {
    this.backPress.componentDidMount();
    // this.timer = setTimeout(() => {
    //   const {navigation} = this.props;
    //   navigation.navigate('Main');
    // }, 2000);
  }
  componentWillUnmount() {
    this.backPress.componentWillUnmount();
    // this.timer && clearTimeout(this.timer);
  }
  onBackPress(){
    this.onBack();
    return true;
  }

  onBack(){
    console.log('====================================');
    console.log(this,"webview");
    console.log('====================================');
    if(this.state.canGoBack){
      //console.log(this.refs.webView,"1111");
      this.webView.goBack();
    }else{
      console.log(this.props,"navigation");
      if(this.props.navigation){
        NavigationUtil.resetBack(this.props);
      }
    }

  }
  onFavoriteButtonClick(){
    const {projectModel,callback}=this.params;
    console.log(projectModel.isFavorite,"909090");
    let isFavorite=!this.state.isFavorite;
    callback(isFavorite);
    this.setState({
      isFavorite
    },(isFavorite)=>{
    let key=projectModel.item.fullName?projectModel.item.fullName:projectModel.item.id.toString();
      if(isFavorite){
        this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
      }else{
        this.favoriteDao.removeFavoriteItem(key);
      }
    })
  }
  renderRightButton(){
      return <View style={{flexDirection:"row"}}>
      <TouchableOpacity
      onPress={()=>{
       this.onFavoriteButtonClick()
      }}>
        <View style={{padding:5,marginRight:8}}>
            <FontAwesome
              name={this.state.isFavorite?'star':'star-o'}
              size={26}
              style={{color:"red",
              lineHeight:26}}
            />
        </View>
      </TouchableOpacity>
      <View style={{paddingTop:6}}>
      {ViewUtil.getShareButton(()=>{})}
      </View>
    </View>
  }
  onNavigationStateChange(navState){
    console.log(navState,"navState");
    
    this.setState({
      canGoBack:navState.canGoBack,
      url:navState.url
    })
  }
  render() {
    console.log(this.state,"1212121");
    
    const titleLayoutStyle = this.state.title.length > 20 ? {paddingRight: 30} : null;
    //const titleLayoutStyle = null;
   let DetailBar=<NavigationBar
          titleLayoutStyle={titleLayoutStyle}
          title={this.state.title}
          leftButton={ViewUtil.getLeftButton(()=>this.onBack())}
          style={{backgroundColor:THEME_COLOR}}
          rightButton={this.renderRightButton()}
    />
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        {DetailBar}
        <WebView
          style={{flex:1}}
          source={{ uri:this.state.url}}
          ref={webView => this.webView = webView}
          startInLoadingState={true}
           onNavigationStateChange={e=>this.onNavigationStateChange(e)}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    // marginTop:20,
    flex:1,
    marginTop:DeviceInfo.isIPhoneX_deprecated?30:0
  }

});


