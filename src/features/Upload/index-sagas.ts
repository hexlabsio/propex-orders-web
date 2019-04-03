import { takeLatest, put, call } from 'redux-saga/effects';
import * as Actions from './index-actions';
import { default as axios } from 'axios';

export function * uploadOrders(action: Actions.UPLOAD_REQUESTED) {
  try {
    yield call(axios.request, { url: '/orders', method: 'POST', data: { orders: action.orders } });
    yield put<Actions.UPLOAD_SUCCESS>({ type: Actions.UPLOAD_SUCCESS });
  } catch (error) {
    yield put<Actions.UPLOAD_ERROR>({ error, type: Actions.UPLOAD_ERROR });
  }
}

export default [
  takeLatest(Actions.UPLOAD_REQUESTED, uploadOrders),
];
