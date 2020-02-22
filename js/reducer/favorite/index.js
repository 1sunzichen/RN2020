import Types from '../../action/types';
const defaultState={};
// favorite:{
// popular:{
  // projectModels:[],
  // isLoading:false
// },
// trending:{
// projectModels:[],
  // isLoading:false
//}
//}
export default function onAction(state=defaultState,action) {
  //console.log(action,"actionReducer");
  
  switch (action.type) {

  case Types.FAVORITE_LOAD_DATA:
    return {
      ...state,
      // 定义redux tree 的机构 很关键
      [action.storeName]:{
        ...state[action.storeName],
        isLoading:true,// 刷新的状态
     
      }
    }
  case Types.FAVORITE_LOAD_SUC://成功过
    return {
      ...state,
        [action.storeName]:{
          ...state[action.storeName],
          projectModels:action.projectModels,
          isLoading:false,
        }
      }
  case Types.FAVORITE_LOAD_FAIL://失败
      return {
        ...state,
        [action.storeName]:{
          ...state[action.storeName],
          isLoading:false
        }
      }

  default:
      return{
        ...state
      }
  }

}