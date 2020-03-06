// import React from 'react';
// import {createStackNavigator} from 'react-navigation-stack';
// import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
// import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

// import {createSwitchNavigator} from 'react-navigation';
// import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
// import HomePage from '../page/HomePage';
// import Page1 from '../page/Page1';
// import Page2 from '../page/Page2';
// import Page3 from '../page/Page3';
// import Page4 from '../page/Page4';
// import Page5 from '../page/Page5';
// import Login from '../page/Login';
// import {Button, Platform, ScrollView} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-view';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterIcon from 'react-native-vector-icons/MaterialIcons';

// // const AppStack = createStackNavigator({
// //   Home: {
// //     screen: HomePage,
// //   },
// //   Page: {
// //     screen: Page1,
// //   },
// // });
// const Authstack = createStackNavigator(
//   {
//     Login: {
//       screen: Login,
//     },
//   },
//   {
//     navigationOptions: {},
//   },
// );

// const AppDraw = createDrawerNavigator(
//   {
//     Page4: {
//       screen: Page4,
//       navigationOptions: {
//         drawerLabel: 'Page4',
//         drawerIcon: ({tintColor}) => {
//           return (
//             <MaterIcon name={'drafts'} size={24} style={{color: tintColor}} />
//           );
//         },
//       },
//     },
//     Page5: {
//       screen: Page5,
//       navigationOptions: {
//         drawerLabel: 'Page5',
//         drawerIcon: ({tintColor}) => {
//           return (
//             <MaterIcon
//               name={'move-to-inbox'}
//               size={24}
//               style={{color: tintColor}}
//             />
//           );
//         },
//       },
//     },
//   },
//   {
//     initialRouteName: 'Page4',
//     contentOptions: {
//       activeTintColor: '#e19',
//     },
//     contentComponent: props => (
//       <ScrollView style={{backgroundColor: '#eee'}}>
//         <SafeAreaView forceInset={{top: 'always', horizontal: 'nerver'}}>
//           <DrawerItems {...props} />
//         </SafeAreaView>
//       </ScrollView>
//     ),
//   },
// );

// const AppTopreactNavigator = createMaterialTopTabNavigator(
//   {
//     Page1: {
//       screen: Page1,
//       navigationOptions: {
//         tarBarLabel: 'All',
//       },
//     },
//     Page2: {
//       screen: Page2,
//       navigationOptions: {
//         tarBarLabel: 'React-Native',
//       },
//     },
//     Page3: {
//       screen: Page3,
//       navigationOptions: {
//         tarBarLabel: 'React',
//       },
//     },
//     Page4: {
//       screen: Page4,
//       navigationOptions: {
//         tarBarLabel: 'java',
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       tabStyle: {mindWidth: 30},
//       upperCaseLabel: false, //标签是否大写
//       scrollEnabled: true, //选项卡是否滚动
//       style: {
//         backgroundColor: 'red', //TabBar的背景色
//       },
//       indicatorStyle: {
//         height: 2,
//         backgroundColor: 'white',
//       }, //标签指示器的样式
//       labelStyle: {
//         fontSize: 23,
//       }, //文件样式
//     },
//   },
// );
// const AppBottomNavigator = createMaterialBottomTabNavigator(
//   {
//     Page1: {
//       screen: Page1,
//       navigationOptions: {
//         tarBarLabel: '最热',
//         tabBarIcon: () => (
//           <Ionicons name={'ios-home'} size={26} style={{color: 'red'}} />
//         ),
//       },
//     },
//     Page2: {
//       screen: Page2,
//       navigationOptions: {
//         tarBarLabel: '趋势',
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons name={'ios-people'} size={26} style={{color: tintColor}} />
//         ),
//       },
//     },

//     Page3: {
//       screen: Page3,
//       navigationOptions: {
//         tarBarLabel: '我的',
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons
//             name={'ios-chatboxes'}
//             size={26}
//             style={{color: tintColor}}
//           />
//         ),
//       },
//     },
//     Page4: {
//       screen: Page4,
//       navigationOptions: {
//         tarBarLabel: '个人',
//         tabBarIcon: ({tintColor}) => (
//           <Ionicons name={'ios-people'} size={26} style={{color: tintColor}} />
//         ),
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       activeTintColor: Platform.OS === 'ios' ? '#fff' : '#fff',
//     },
//     barStyle: {backgroundColor: '#fff'},
//   },
// );
// const AppStackNavigator = createStackNavigator({
//   HomePage: {
//     screen: HomePage,
//   },
//   Page1: {
//     screen: Page1,
//     navigationOptions: ({navigation}) => ({
//       title: `${navigation.state.params.name}页面名`,
//     }),
//   },
//   Page2: {
//     screen: Page2,
//     navigationOptions: {
//       title: '页面2',
//     },
//   },
//   Page3: {
//     screen: Page3,
//     navigationOptions: props => {
//       const {navigation} = props;
//       const {state, setParams} = navigation;
//       const {params} = state;
//       return {
//         title: params.title ? params.title : '333',
//         headerRight: (
//           <Button
//             title={params.mode === 'edit' ? 'save' : 'edit'}
//             onPress={() =>
//               setParams({mode: params.mode === 'edit' ? '888' : 'edit'})
//             }
//           />
//         ),
//       };
//     },
//   },
//   Page4: {
//     screen: Page4,
//     navigationOptions: {
//       title: '页面4',
//     },
//   },
//   Bottom: {
//     screen: AppBottomNavigator,
//     navigationOptions: {
//       title: 'BottomNavigator',
//     },
//   },
//   Top: {
//     screen: AppTopreactNavigator,
//     navigationOptions: {
//       title: 'TopNavigator',
//     },
//   },
//   DrawerNav: {
//     screen: AppDraw,
//     navigationOptions: {
//       title: 'AppDraw',
//     },
//   },
// });
// export default createSwitchNavigator(
//   {
//     Auth: Authstack,
//     App: AppStackNavigator,
//   },
//   {
//     initialRouteName: 'Auth',
//   },
// );
