import Types from '../types';
import _ from 'lodash';
import DataStore from '../../expand/dao/dataStore';
import {FALG_STORAGE} from '../../expand/dao/dataStore';
import {handleData} from '../ActionUtil';
// 第一次加载
export function onLoadTrendingData(storeName,url,pageSize) {
  return dispatch=>{
    dispatch({type:Types.TRENDING_REF,storeName})
    
    let dataStore=new DataStore();
    dataStore.fetchData(url,FALG_STORAGE.flag_trending)
    .then(data=>{
      // 第一次加载
        // console.log('====================================');
        // console.log(data,"abcdefg",Types.LOAD_TRENDING_SUC);
        // console.log('====================================');
        handleData(Types.LOAD_TRENDING_SUC,dispatch,storeName,data,pageSize)
    })
    .catch((error)=>{

      dispatch({
        type:Types.LOAD_TRENDING_FAIL,
        storeName,
        error
      })
    })
  }
}
// 加载更多
export function onLoadMoreTrendingData(storeName,pageIndex,pageSize,
dataArray=[],callBack) {
  //dataArray 总数据
  return dispatch=>{
    //模拟网络请求
   setTimeout(() => {
     //加载完全部数据
     if((pageIndex-1)*pageSize>=dataArray.length){
       if(typeof callBack==='function'){
         callBack("no more")
       }
       dispatch({
         type:Types.LOADMORE_TRENDING_FAIL,
         error:'mo more',
         storeName:storeName,
         pageIndex:--pageIndex,
         projectModes:dataArray
       })
     }else{
       let max=pageSize*pageIndex>dataArray.length?
       dataArray.length:pageSize*pageIndex;
       dispatch({
         type:Types.LOADMORE_TRENDING_SUC,
         storeName,
         pageIndex,
         // 分页数据
         projectModes:dataArray.slice(0,max)
       })
     }
   }, 100);
  }
}

//