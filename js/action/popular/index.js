import Types from '../types';
import _ from 'lodash';
import DataStore from '../../expand/dao/dataStore';
// 第一次加载
export function onLoadPopularData(storeName,url,pageSize) {
  return dispatch=>{
    dispatch({type:Types.POPULAR_REF,storeName})
    let dataStore=new DataStore();
    dataStore.fetchData(url)
    .then(data=>{
      // 第一次加载
      console.log('====================================');
      console.log(dispatch,storeName,data,pageSize,"🐘");
      console.log('====================================');
        handleData(dispatch,storeName,data,pageSize)
    })
    .catch((error)=>{
      console.log('====================================');
      console.log(error,"error");
      console.log('====================================');
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
         type:Types.LOADMORE_POPULAR_FAIL,
         error:'mo more',
         storeName:storeName,
         pageIndex:--pageIndex,
         projectModes:dataArray
       })
     }else{
       let max=pageSize*pageIndex>dataArray.length?
       dataArray.length:pageSize*pageIndex;
       dispatch({
         type:Types.LOADMORE_POPULAR_SUC,
         storeName,
         pageIndex,
         // 分页数据
         projectModes:dataArray.slice(0,max)
       })
     }
   }, 100);
  }
}
// 成功之后触发的actions
function handleData(dispatch,storeName,data,pageSize) {

   let fixItems=[];
   if(data&&data.data&&data.data.items){
     fixItems=data.data.items;
   }
    dispatch({
      type:Types.LOAD_POPULAR_SUC,
      //首次加载 发送原始数据
      items:fixItems,
      storeName,
      //
      pageIndex:1,
      // 每次加载的数据
      projectModes:pageSize>fixItems.length?
      fixItems:fixItems.slice(0,pageSize),//第一次要加载的数据


    })
}
//