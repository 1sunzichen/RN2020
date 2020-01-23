import Types from '../../action/types';
const defaultState={};
export default function onAction(state=defaultState,action) {
  console.log('====================================');
  console.log(action,"shu");
  console.log('====================================');
  switch (action.type) {
    //下拉刷新
  case Types.LOAD_TRENDING_SUC:
    return {
      ...state,
      // 定义redux tree 的机构 很关键
      [action.storeName]:{
        ...state[action.storeName],
        items:action.items,//接受原始数据
        isLoading:false,// 上拉刷新的状态
        pageIndex:action.pageIndex,// 第几页
        hideLoadingMore:false,// 下拉加载的状态
        projectModes:action.projectModes,//此次要展示的数据
      }
    }
  case Types.TRENDING_REF://下拉刷新
    return {
      ...state,
        [action.storeName]:{
          ...state[action.storeName],
          items:action.items,
          isLoading:true,
          hideLoadingMore:true
        }
      }
  case Types.LOAD_TRENDING_FAIL:
      return {
        ...state,
        [action.storeName]:{
          ...state[action.storeName],
          items:action.items,
          isLoading:false
        }
      }
  case Types.LOADMORE_TRENDING_SUC:
      return {
        ...state,
        [action.storeName]:{
          ...state[action.storeName],
          projectModes:action.projectModes,
          hideLoadingMore:false,
          pageIndex:action.pageIndex
        }
      }
  case Types.LOADMORE_TRENDING_FAIL:
      return {
        ...state,
        [action.storeName]:{
          ...state[action.storeName],
          //projectModes:action.projectModes,
          hideLoadingMore:true,
          pageIndex:action.pageIndex,
          isLoading:false
        }
      }
  default:
      return{
        ...state
      }
  }

}