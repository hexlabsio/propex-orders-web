import { takeLatest, put, call, take, takeEvery } from 'redux-saga/effects';
import * as Actions from './index-actions';
import { default as axios, AxiosResponse } from 'axios';
import { Order } from './index-state';
import { Collection } from '../../index-state';
import { apiEndpoint } from '../../index';

export function * getOrders() {
  try {
    const orderResponse: AxiosResponse<Collection<Order>> = yield call(axios.request, { url: `${apiEndpoint}/orders` });
    yield put<Actions.GET_ORDERS_SUCCESS>({ type: Actions.GET_ORDERS_SUCCESS, orders: orderResponse.data.member });
  } catch (error) {
    yield put<Actions.GET_ORDERS_ERROR>({ error, type: Actions.GET_ORDERS_ERROR });
  }
}

export function * saveProduct({ product, original }: Actions.PRODUCT_SAVED) {
  console.log(product);
  yield put<Actions.PRODUCT_SAVE_SUCCESS>({ type: Actions.PRODUCT_SAVE_SUCCESS });
}

export default [
  takeLatest(Actions.GET_ORDERS_REQUEST, getOrders),
  takeLatest(Actions.PRODUCT_SAVED, saveProduct),
];
