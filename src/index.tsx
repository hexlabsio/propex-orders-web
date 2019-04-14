import { default as React } from 'react';
import { default as ReactDOM } from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { default as configureStore, history, sagaMiddleware } from './index-store';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { default as rootSaga } from './index-sagas';
import { default as initialRootState } from './index-state';
import { default as PropexHeader } from './components/header';
import './index.sass';
import './fonts.sass';
import Orders from './features/Orders';
import Upload from './features/Upload';

const store = configureStore(initialRootState);

export const apiEndpoint = process.env.REACT_APP_ENV === 'production' ? 'https://wlm6btns8j.execute-api.eu-west-1.amazonaws.com/dev' : '';

sagaMiddleware.run(rootSaga);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PropexHeader user={{ name: 'Chris Barbour', access: 'Administrator' }}/>
      <Switch>
        <Route exact={true} path="/orders" component={Orders} />
        <Route exact={true} path="/upload" component={Upload} />
        <Route render={() => (<div>Miss</div>)} />
      </Switch>
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));

serviceWorker.unregister();
