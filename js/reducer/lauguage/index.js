import Types from '../../action/types';
import FLAG_LANGUAGE from '../../expand/dao/LauguageDao.js';
const defaultState={
  languages:[],
  keys:[]
};
export default function onAction(state=defaultState,action) {
  //console.log(action,"actionReducer");
  
  switch (action.type) {
    //下拉刷新
  case Types.LAUGUAGE_LOAD_SUC:
    if(FLAG_LANGUAGE.flag_key===action.flag){

      return {
        ...state,
        keys:action.languages
      }
    }else{
      return {
        ...state,
        languages:action.languages,
      }
    }

  default:
      return{
        ...state
      }
  }

}