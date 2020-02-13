// import React,{Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
const FAVOROTE_KEY_PREFIX="favorite_";
import AsyncStorage from '@react-native-community/async-storage';
//收藏 数组 类  获取数据  的 类
class FavoriteDao{
  constructor(flag) {
    this.favoriteKey=FAVOROTE_KEY_PREFIX+flag;
    this.getFavoriteKeys=this.getFavoriteKeys.bind(this);
    this.saveFavoriteItem=this.saveFavoriteItem.bind(this);
    this.removeFavoriteItem=this.removeFavoriteItem.bind(this);
    this.getAllItems=this.getAllItems.bind(this);
  }
  //保存收藏的单个项目  
  saveFavoriteItem(key,value,callback){
    AsyncStorage.setItem(key,value,(error,result)=>{
      if(!error){
        this.updateFavoriteKeys(key,true);
      }
    })
  }
  // 更新Favorite-key 集合 所有相同类型
  // isAdd true 添加,false 删除
  updateFavoriteKeys(key,isAdd){
    AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
      
      if(!error){
      console.log(result,"niuniu",error,isAdd);
        //收藏KEY
        let favoriteKeys=[];
        if(result){
          favoriteKeys=JSON.parse(result);
        }
        let index=favoriteKeys.indexOf(key);
        if(isAdd){//添加之前不存在的
          if(index===-1){
            favoriteKeys.push(key);
          }
        }else{//删除之前存在的
          if(index!==-1){
            favoriteKeys.splice(index,1);
          }
        }
        AsyncStorage.setItem(this.favoriteKey,JSON.stringify(favoriteKeys));
      }
    })
  }
  // 获取 所有收藏Repository的key
  getFavoriteKeys(){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(this.favoriteKey,(error,result)=>{
        if(!error){
          try{
            resolve(JSON.parse(result));
          }catch(e){
            reject(error);
          }
        }else{
          reject(error);
        }
      })
    })
  }

  //移除 已经收藏的项目
  removeFavoriteItem(key){
    AsyncStorage.removeItem(key,(error,result)=>{
      if(!error){
        this.updateFavoriteKeys(key,false)
      }
    })
  }

  //获取所有收藏项目
  getAllItems(){
    return new Promise((resolve,reject)=>{
      this.getFavoriteKeys().then((keys)=>{
        let items=[];
        if(keys){
          AsyncStorage.multiGet(keys,(err,stores)=>{
            try{
              stores.map((result,i,store)=>{
                let key=store[i][0];
                let value=store[i][1];
                if(value){
                  items.push(JSON.parse(value))
                }
              })
              resolve(items);
            }catch(e){

              reject(e)
            }
            });
          }else{
            resolve(items);
          }
        }).catch((e)=>{
          reject(e);
        })
    })
  }

// render(){
//      return(
//            <View>
//               <Text>hello world</Text>
//            </View>
//             )
//          }
}
export default FavoriteDao;