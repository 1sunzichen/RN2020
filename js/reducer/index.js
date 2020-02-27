import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';
import trending from './trending';
import favorite from './favorite';
import lauguage from './lauguage';
import {rootCom, RootNavigator} from '../navigators/AppNavigator';
// 1 制定默认的 this.state

const navState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(rootCom),
);
//todo 02:23
const navReducer = (state = navState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
// 合并 reducer  
// 2.又将redux  state  theme 包裹了 一层
const index = combineReducers({
  nav: navReducer,
  theme: theme,
  popular:popular,
 trending:trending,
 favorite:favorite,
 lauguage:lauguage
});

export default index;
