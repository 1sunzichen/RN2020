import Types from '../../action/types';
const defaultState={};
export default function onAction(state=defaultState,action) {
  console.log(action,"actionReducer");
  
  switch (action.type) {
    //下拉刷新
  case Types.LOAD_POPULAR_SUC:
    return {
      ...state,
      // 定义redux tree 的机构 很关键
      [action.storeName]:{
        ...state[action.storeName],
        items:action.items,//接受原始数据
        isLoading:false,// 上拉刷新的状态
        pageIndex:action.pageIndex,// 第几页
        hideLoadingMore:action.items.length<10,// 下拉加载的状态
        projectModels:action.projectModels,//此次要展示的数据
      }
    }
  case Types.POPULAR_REF://下拉刷新
    return {
      ...state,
        [action.storeName]:{
          ...state[action.storeName],
          items:action.items,
          isLoading:true,
          hideLoadingMore:true
        }
      }
  case Types.LOAD_POPULAR_FAIL:
      return {
        ...state,
        [action.storeName]:{
          ...state[action.storeName],
          items:action.items,
          isLoading:false
        }
      }
  case Types.LOADMORE_POPULAR_SUC:
      return {
        ...state,
        [action.storeName]:{
          ...state[action.storeName],
          projectModels:action.projectModels,
          hideLoadingMore:false,
          pageIndex:action.pageIndex
        }
      }
  case Types.LOADMORE_POPULAR_FAIL:
      return {
        ...state,
        [action.storeName]:{
          ...state[action.storeName],
          //projectModes:action.projectModes,
          hideLoadingMore:true,
          pageIndex:action.pageIndex
          //isLoading:false
        }
      }
  default:
      return{
        ...state
      }
  }

}