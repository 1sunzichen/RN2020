import React from 'react';
import {TouchableOpacity,StyleSheet,Icons,View,Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default class ViewUtil{
  //  callback   单机Item的回调
  //  text       显示的文本         
  //  color      图标着色         
  //  Icons      react-native-vector-icons 组件
  //  icon       左侧图标
  //  expandableIco 右侧图标
  //  {XML}
  // 
  static getSettingItem(callback,text,color,Icons,icon,expandableIco){
    return (
      <TouchableOpacity
        onPress={callback}
        style={styles.setting_item_container}
      >
        <View style={{alignItems:'center',flexDirection:'row'}}>
          {Icons&&icon?
            <Icons
              name={icon}
              size={16}
              style={{color:color,marginRight:10}}
            />: 
            <View style={{opacity:1,width:16,height:16,marginRight:10}}/>
          }
          <Text>{text}</Text>
        </View>
          <Ionicons
                    size={16}
                    name={expandableIco?expandableIco:"ios-arrow-forward"}
                    style={{marginRight:10,color:color||"white",
                    alignSelf:"center"}}
                  />
      </TouchableOpacity>
    )
  }
  //获取设置页的 Item 
  // 单击item的回调
  // memu @MORE_MENU
  // color 图标着色
  // expandableIco 右侧图标
  static getMenuItem(callback,menu,color,expandableIco){
    return ViewUtil.getSettingItem(callback,menu.name,color,menu.Icons,menu.icon,
    expandableIco);
  }

  static getLeftButton(callback){
    return <TouchableOpacity
        style={{padding:8,paddingLeft:12}}
        onPress={callback}
        underlayColor={"transparent"}
    >
      <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{opacity:0.9,color:'white'}}
      />
    
    </TouchableOpacity>
  }

   /**
     * 获取右侧文字按钮
     * @param title
     * @param callBack
     * @returns {XML}
     */
    static getRightButton(title, callBack) {
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={callBack}>
            <Text style={{fontSize: 20, color: '#FFFFFF', marginRight: 10}}>{title}</Text>
        </TouchableOpacity>
    }
  static getShareButton(callback){
    return <TouchableOpacity
      underlayColor={"transparent"}
      onPress={callback}
    >
      <Ionicons
        name={"md-share"}
        size={20}
        style={{opacity:0.9,marginRight:10,color:"white"}}
      />
    
    </TouchableOpacity>
  }
}
const styles=StyleSheet.create({
  setting_item_container:{
    backgroundColor:"white",
    padding:10,height:60,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:'row'
  }
})