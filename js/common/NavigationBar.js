import React,{Component} from 'react';
import {PropTypes} from 'prop-types';
import {View, Text, StyleSheet, Button,
ViewPropTypes,StatusBar,
Platform} from 'react-native';
const NAVBAR_IOS_HEIGHT=44;// IOS导航栏的高度
const NAVBAR_ANDROID_HEIGHT=50;// 安卓导航栏的高度
const STATUS_BAR_HEIGHT=20; //状态栏的高度
const StatusBarShape={
  barStyle:PropTypes.oneOf(['light-content','default']),
  hidden:PropTypes.bool,
  backgroundColor:PropTypes.string
}
// 头部公共样式
class NavigationBar extends Component{

  //类型检查
  static propTypes={
    style:ViewPropTypes.style,
    title:PropTypes.string,
    titleView:PropTypes.element,
    titleLayoutStyle:ViewPropTypes.style,
    hide:PropTypes.bool,
    statusBar:PropTypes.shape(StatusBarShape),
    rightButton:PropTypes.element,
    leftButton:PropTypes.element,
  }
  // 设置默认属性 
  static defaultProps={
    statusBar:{
      barStyle:'light-content',
      hidden:false
    }
  };

  getButtonElement(data){
    return <View style={styles.navBarButton}>
    {data?data:null}
    </View>
  }
render(){
      let statusBar=!this.props.statusBar.hidden?
      <View style={styles.statusBar}>
          <StatusBar  {...this.props.statusBar}/>
      </View>:null;
      let titleView=this.props.titleView?this.props.titleView:
      <Text ellipsizeMode="head" numberOfLines={1}
style={styles.title}>{this.props.title}</Text>;
      let content=this.props.hide?null:
      <View style={styles.navBar}> 
          {this.getButtonElement(this.props.leftButton)}
          <View style={[styles.navBarTitleContainer,this.props.titleLayoutStyle]}>
            {titleView}
          </View>
          {this.getButtonElement(this.props.rightButton)}
      </View>
     return(
           <View style={[styles.container,this.props.style]}>
              {statusBar}
              {content}
           </View>
            )
         }
}
const styles=StyleSheet.create({
  container:{
    backgroundColor:"#231"
  },
  navBarButton:{
    alignItems:"center"
  },
  navBar:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-between",
    height:Platform.OS==="ios"?NAVBAR_IOS_HEIGHT:NAVBAR_ANDROID_HEIGHT
  },
  navBarTitleContainer:{
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    left:40,
    right:40,
    top:0,
    bottom:0
  },
  title:{
    fontSize:20,
    color:"white"
  },
  statusBar:{
    height:Platform.OS==="ios"?STATUS_BAR_HEIGHT:0
  }
})
export default NavigationBar;