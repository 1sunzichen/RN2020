import Types from '../../action/types';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao.js';
const defaultState={
  languages:[],
  keys:[]
};
export default function onAction(state=defaultState,action) {
  //console.log(action,"actionReducer");
  
  switch (action.type) {
    //下拉刷新
  case Types.LAUGUAGE_LOAD_SUC:
    console.log(FLAG_LANGUAGE.flag_key,action.flag,"9090");
    
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