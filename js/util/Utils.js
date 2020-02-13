// 检查是否收藏
export default class Utils{
  static checkFavorite(item,items=[]){
    if(!items){
      return false;
    }
    for(let i=0,len=items.length;i<len;i++){
      let id=item.id?item.id:item.fullName;
      if(id.toString()===items[i]){
        return true;
      }
    }
    return false;
  }
}