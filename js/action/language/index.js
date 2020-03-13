import LanguageDao from '../../expand/dao/LanguageDao';
import Types from '../types.js';
export function onLoadLanguage(flagkey){
  return async dispatch=>{
    try {
    let languages= await new LanguageDao(flagkey).fetch();
      dispatch({type:Types.LAUGUAGE_LOAD_SUC,languages:languages,flag:flagkey})
    } catch (error) {
      console.log(error,"error");
      
    }
  }
}