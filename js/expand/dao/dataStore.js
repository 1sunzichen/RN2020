import AsyncStorage from '@react-native-community/async-storage';
// github 趋势的 情况
import GitHubTrend from 'GitHubTrending';
export const FALG_STORAGE={
  flag_trending:"trending",
  flag_popular:"popular"
}
export default class DataStore{
  // 保存方法
  saveData(url,data,callback){
    if(!data||!url) return;

    AsyncStorage.setItem(url,JSON.stringify(this._wrapData(data)),callback);
  }

  // 封装数据方法
  _wrapData(data){
    return {
      data:data,
      timestamp:new Date().getTime() 
    }
  }
  
  // 获取本地数据
  fetchLocalData(url){
    return new Promise((resolve,reject)=>{
      AsyncStorage.getItem(url,(error,result)=>{
        if(!error){
          try{
            resolve(JSON.parse(result))
            
          }catch(e){
            reject(e);
            console.error(e)
          }
        }else{
          reject(error);
          console.error(error);
          
        }
      })
    })
  }
  // 获取网络数据
  fetchNetData(url,flag){
    return new Promise((resolve,reject)=>{
      if(flag!=FALG_STORAGE.flag_trending){

      fetch(url)
        .then((response)=>{
          if(response.ok){
            return response.json()
          }
          throw new Error("NetWork response was not ok;");
        })
        .then((responseData)=>{
          this.saveData(url,responseData)
        })
        .catch((error)=>{
          reject(error);
        })
    }
      else{
        new GitHubTrend().fetchTrending(url)
        .then(items=>{
          // //console.log('====================================');
          // //console.log(url,items,"abcd");
          // //console.log('====================================');
          if(!items){
            throw new Error('responseData is null');
          }
          this.saveData(url,items);
          resolve(items);
        })
        .catch(error=>{
          reject(error)
        })
      }
      })
  }

  //入口方法
  fetchData(url,flag){
    return new Promise((resolve,reject)=>{
      this.fetchLocalData(url).then((wrapData)=>{
        // //console.log('====================================');
        // //console.log(wrapData,'fetchLocalData');
        // //console.log('====================================');
        if(wrapData&&DataStore.checkTimestampVaild(wrapData.timestamp)){
          resolve(wrapData)
        }else{
          this.fetchNetData(url,flag).then((data)=>{
        //   //console.log('====================================');
        // //console.log(wrapData,'fetchNetData');
        // //console.log('====================================');
            resolve(this._wrapData(data))
          }).catch((error)=>{
            // //console.log('====================================');
            // //console.log('fetchNetDataError',error);
            // //console.log('====================================');
            reject(error)
          })
        }
      }).catch((error)=>{
        this.fetchNetData(url,flag).then((data)=>{
          resolve(this._wrapData(data))
        }).catch(error=>{
          reject(error);
        })
      })
    })
  }
  // 有效期检查方法
  static checkTimestampVaild(timestamp){
    const currentDate=new Date();
    const targetDate=new Date();
    targetDate.setTime(timestamp);
    if(currentDate.getMonth()!==targetDate.getMonth()){
      return false
    }
    if(currentDate.getDate()!==targetDate.getDate()){
      return false
    }
    if(currentDate.getHours()!==targetDate.getHours()){
      return false
    }
    return true;
  }
}