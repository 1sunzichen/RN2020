import projectModel from '../modal/ProjectModel.js';
import Utils from '../util/Utils.js';
// 成功之后触发的actions
export function handleData(actionType,dispatch,storeName,data,pageSize,favoriteDao) {

   let fixItems=[];
   if(data&&data.data){
     if(Array.isArray(data.data)){
      fixItems=data.data;
     }else if(Array.isArray(data.data.items)){
      fixItems=data.data.items;
     }
   }

   let showItems=pageSize>fixItems.length?
      fixItems:fixItems.slice(0,pageSize);
  //  console.log('====================================');
  //  console.log(fixItems,"qw",actionType);
  //  console.log('====================================');
    _projectModels(showItems,favoriteDao,projectModels=>{

    dispatch({
      type:actionType,
      //首次加载 发送原始数据
      items:fixItems,
      storeName,
      //
      pageIndex:1,
      // 每次加载的数据
      projectModels:projectModels,//第一次要加载的数据


    })
    })
}
//
export async function _projectModels(showItems,favoriteDao,callback){
  let keys=[];
 
  
  try{
    keys=await favoriteDao.getFavoriteKeys();
  }catch(e){
    console.log(e);
  }
  let projectModels=[];


  for(let i=0,len=showItems.length;i<len;i++){
      
    //1. 构建model rojectModel 构造函数 showItems[i]
    //2. 判断是否收藏  Utils.checkFavorite(showItems[i],keys)
    //3. 放入数组    
    projectModels.push(new projectModel(showItems[i],Utils.checkFavorite(showItems[i],keys)));
  }
  if(typeof callback==="function"){
    callback(projectModels);
  }
}