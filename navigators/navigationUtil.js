export default class NavigationUtil {
  static goPage(params, page) {
    //const navigation = NavigationUtil.navigation;
    const navigation = NavigationUtil.navigation;
    if (!navigation) {
      console.log('null');
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
