import { all } from 'redux-saga/effects';
import { default as ordersSaga } from './features/Orders/index-sagas';
import { default as uploadSaga } from './features/Upload/index-sagas';

export default function * rootSaga() {
  yield all([
    ...ordersSaga,
    ...uploadSaga,
  ]);
}
