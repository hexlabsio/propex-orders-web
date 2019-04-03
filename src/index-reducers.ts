import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { default as ordersReducer } from './features/Orders/index-reducers';
import { default as uploadReducer } from './features/Upload/index-reducers';

export default (history: History) => combineReducers({
  router: connectRouter(history),
  orders: ordersReducer,
  upload: uploadReducer,
});
