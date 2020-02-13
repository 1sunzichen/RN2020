import Types from '../types';
import _ from 'lodash';
import DataStore from '../../expand/dao/dataStore';
import {FALG_STORAGE} from '../../expand/dao/dataStore';
import {handleData,_projectModels} from '../ActionUtil';
// 第一次加载 刷新 
export function onLoadPopularData(storeName,url,pageSize,favoriteDao) {
 
  
  return dispatch=>{
    dispatch({type:Types.POPULAR_REF,storeName})
    let dataStore=new DataStore();
    //  这个是 离线缓存 要传输的类型   trending 还是 popular 
    // 之后 是 用来 请求 不同的api 
    dataStore.fetchData(url,FALG_STORAGE.flag_popular)
    .then(data=>{
      // 第一次加载
      // console.log('====================================');
      // console.log(dispatch,storeName,data,pageSize,"🐘");
      // console.log('====================================');
       // 这个是 请求api后  action 对类型 细分  将数据 扁平化 
       // 就没有 大类型 trending 和 popular 之分 不过 是包括 所有的
       // 类型的 
        handleData(Types.LOAD_POPULAR_SUC,dispatch,storeName,data,pageSize,favoriteDao)
    })
    .catch((error)=>{
      // console.log('====================================');
      // console.log(error,"error");
      // console.log('====================================');
      dispatch({
        type:Types.LOAD_POPULAR_FAIL,
        storeName,
        error
      })
    })
  }
}
// 加载更多
export function onLoadMorePopularData(storeName,pageIndex,pageSize,
dataArray=[],favoriteDao,callBack) {
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
         type:Types.LOADMORE_POPULAR_FAIL,
         error:'mo more',
         storeName:storeName,
         pageIndex:--pageIndex,
     
       })
     }else{
       let max=pageSize*pageIndex>dataArray.length?
       dataArray.length:pageSize*pageIndex;

        _projectModels(dataArray.slice(0,max),favoriteDao,data=>{

        dispatch({
          type:Types.LOADMORE_POPULAR_SUC,
          storeName,
          pageIndex,
          // 分页数据
          projectModels:data
        })
        })
     }
   }, 100);
  }
}

//