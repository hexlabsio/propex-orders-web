import { default as React } from 'react';
import { default as ReactDOM } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { default as configureStore, history, sagaMiddleware } from './index-store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { default as rootSaga } from './index-sagas';
import { default as initialRootState } from './index-state';
import Orders from './features/Orders';

const store = configureStore(initialRootState);

sagaMiddleware.run(rootSaga);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact={true} path="/" component={Orders} />
        <Route render={() => (<div>Miss</div>)} />
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
