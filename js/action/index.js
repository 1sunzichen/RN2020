import {onThemeChange} from './theme';
import {onLoadPopularData,onLoadMorePopularData,onFlushPopularFavorite} from './popular';
import {onLoadTrendingData,onLoadMoreTrendingData,onFlushTrendingFavorite} from './trending';
import {onLoadFavoriteData} from './favorite';
import {onLoadLanguage} from './lauguage';
export default {
  onThemeChange,
  onLoadPopularData,
  onLoadMorePopularData,
  onLoadTrendingData,
  onLoadMoreTrendingData,
  //获取收藏
  onLoadFavoriteData,
  // 最热 刷新 收藏状态
  onFlushPopularFavorite,
  // 最热 刷新 收藏状态
  onFlushTrendingFavorite,
  //导出语言目录
  onLoadLanguage
};
