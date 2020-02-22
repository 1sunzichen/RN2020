export default class NavigationUtil {
  static goPage(params, page) {
    //const navigation = NavigationUtil.navigation;
    // 3:直接读取 或者 间接获得都可以 因为传过来了
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      //console.log('null');
      return;
    }
    navigation.navigate(page, {...params});
  }
  static resetBack = params => {
    const {navigation} = params;
    navigation.goBack();
  };

  static resetHome = params => {
    const {navigation} = params;
    navigation.navigate('Main');
  };
}
