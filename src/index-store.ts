import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { default as createRootReducer } from './index-reducers';
import { applyMiddleware, compose, createStore } from 'redux';

import reduxSaga from 'redux-saga';

interface WindowWithReduxDevTools extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: <R>(r:R) => R;
}

const windowWithRedux = window as WindowWithReduxDevTools;
export const sagaMiddleware = reduxSaga();
export const history = createBrowserHistory();

export default function configureStore(initialState: any) {
  const composeEnhancers = windowWithRedux.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? windowWithRedux.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  return createStore(
    createRootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
  );
}
