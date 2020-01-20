import AsyncStorage from '@react-native-community/async-storage';
export default class DataStore{
  // 保存方法
  saveData(url,data,callback){
    if(!data||!url) return;
    console.log('====================================');
    console.log(JSON.stringify(this._wrapData(data)));
    console.log('====================================');
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
  fetchNetData(url){
    return new Promise((resolve,reject)=>{
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
    })
  }

  //入口方法
  fetchData(url){
    return new Promise((resolve,reject)=>{
      this.fetchLocalData(url).then((wrapData)=>{
        console.log('====================================');
        console.log(JSON.stringify(wrapData),"wrapData",wrapData.timestamp);
        console.log('====================================');
        if(wrapData&&DataStore.checkTimestampVaild(wrapData.timestamp)){
          resolve(wrapData)
        }else{
          this.fetchNetData(url).then((data)=>{
            resolve(this._wrapData(data))
          }).catch((error)=>{
            reject(error)
          })
        }
      }).catch((error)=>{
        this.fetchNetData(url).then((data)=>{
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