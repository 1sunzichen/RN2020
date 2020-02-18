import Types from '../types';
import _ from 'lodash';
import DataStore , {FALG_STORAGE}from '../../expand/dao/dataStore';
import FavoriteDao from '../../expand/dao/FavoriteDao.js';
import projectModel from '../../modal/ProjectModel.js';
import {handleData,_projectModels} from '../ActionUtil';
// 收藏页面 flag 标识；isShowLoading 是否显示loading
export function onLoadFavoriteData(flag,isShowLoading) {
 
  
  return dispatch=>{
    dispatch({type:Types.FAVORITE_LOAD_DATA,storeName:flag})
    let dataStore=new DataStore();
    //  这个是 离线缓存 要传输的类型   trending 还是 popular 
    // 之后 是 用来 请求 不同的api 
    new FavoriteDao(flag).getAllItems()
      .then(items=>{
        let resultData=[];

        for(let i=0,len=items.length;i<len;i++){
          resultData.push(new projectModel(items[i],true))
        }
        dispatch({type:Types.FAVORITE_LOAD_SUC,projectModels:resultData,storeName:flag})
      })
      .catch(e=>{
        console.log('====================================');
        console.log(e);
        dispatch({type:Types.FAVORITE_LOAD_FAIL,error:e,storeName:flag})
        console.log('====================================');
      })
  }
}
