import { takeLatest, put } from 'redux-saga/effects';
import * as Actions from './index-actions';

export function * getOrders() {
  yield put<Actions.GET_ORDERS_SUCCESS>({ type: Actions.GET_ORDERS_SUCCESS });
}

export default [
  takeLatest(Actions.GET_ORDERS_REQUEST, getOrders),
];
