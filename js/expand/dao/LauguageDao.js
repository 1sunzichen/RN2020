
import AsyncStorage from '@react-native-community/async-storage';
import langs from '../../res/data/lang.json';
import keys from '../../res/data/keys.json';
export const FLAG_LANGUAGE={flag_lauguage:'language_dao_language',
flag_key:'language_dao_key'}

export default class LauguageDao{
  constructor(flag){
    this.flag=flag;
  }
  //获取语言或标签
  fetch(){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(this.flag,(error,result)=>{
          if(error){
            reject(error);
            return;
          }
          if(!result){
            let data=this.flag===FLAG_LANGUAGE.flag_lauguage?langs:keys;
            this.save(data);
            resolve(data);
          }else{
            try{
              resolve(JSON.parse(result));
            }catch(e){
              reject(e,"error")
            }
          }
      })
    })
  }
  //保存语言或标签
  save(objectData){
    let stringData=JSON.stringify(objectData);
    AsyncStorage.setItem(this.flag,stringData,(error,result)=>{

    })
  }
}