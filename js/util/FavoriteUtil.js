import {FALG_STORAGE} from '../expand/dao/dataStore.js';

export default class FavoriteUtil{
  static onFavorite(favoriteDao,item,isFavorite,flag){

    // 根据 item 接口返回的结构 不同 进行设计popular 或 trending
    //console.log(item,"1212",FALG_STORAGE,favoriteDao);
    
    const key=flag===FALG_STORAGE.flag_trending?item.fullName:item.id.toString();

    // 存贮 收藏 或 移除 单个
    if(isFavorite){
      favoriteDao.saveFavoriteItem(key,JSON.stringify(item));
    }else{
      favoriteDao.removeFavoriteItem(key);
    }
  }
  //  static onFavorite(favoriteDao, item, isFavorite, flag) {
  //       const key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id.toString();
  //       if (isFavorite) {
  //           favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
  //       } else {
  //           favoriteDao.removeFavoriteItem(key);
  //       }
  //   }
}