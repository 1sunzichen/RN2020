import {applyMiddleware, createStore} from 'redux';
import reducers from '../reducer';
import thunk from 'redux-thunk';


import {middleware} from '../navigators/AppNavigator';
const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a funtion');
  } else {
    console.log('dispatching', action);
  }
  const result = next(action);
  console.log('nextState', store.getState());
};
const middlewares = [middleware, thunk, logger];

export default createStore(reducers, applyMiddleware(...middlewares),);
