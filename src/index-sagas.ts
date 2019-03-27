import { all } from 'redux-saga/effects';
import { default as ordersSaga } from './features/Orders/index-sagas';

export default function * rootSaga() {
  yield all([
    ...ordersSaga,
  ]);
}
