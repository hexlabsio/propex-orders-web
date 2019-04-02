import { takeLatest, put, call } from 'redux-saga/effects';
import * as Actions from './index-actions';
import { default as axios, AxiosResponse } from 'axios';
import { Order } from './index-state';
import { Collection } from '../../index-state';

export function * getOrders() {
  try {
    const orderResponse: AxiosResponse<Collection<Order>> = yield call(axios.request, { url: '/orders' });
    yield put<Actions.GET_ORDERS_SUCCESS>({ type: Actions.GET_ORDERS_SUCCESS, orders: orderResponse.data.member });
  } catch (error) {
    yield put<Actions.GET_ORDERS_ERROR>({ error, type: Actions.GET_ORDERS_ERROR });
  }
}

export default [
  takeLatest(Actions.GET_ORDERS_REQUEST, getOrders),
];
