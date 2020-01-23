// 成功之后触发的actions
export function handleData(actionType,dispatch,storeName,data,pageSize) {

   let fixItems=[];
   if(data&&data.data){
     if(Array.isArray(data.data)){
       
     fixItems=data.data;
     }else if(Array.isArray(data.data.items)){
     fixItems=data.data.items;

     }
   }
   console.log('====================================');
   console.log(fixItems,"qw",actionType);
   console.log('====================================');
    dispatch({
      type:actionType,
      //首次加载 发送原始数据
      items:fixItems,
      storeName,
      //
      pageIndex:1,
      // 每次加载的数据
      projectModes:pageSize>fixItems.length?
      fixItems:fixItems.slice(0,pageSize),//第一次要加载的数据


    })
}
//