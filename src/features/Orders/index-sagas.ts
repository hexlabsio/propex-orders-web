import { takeLatest, put, call, delay } from 'redux-saga/effects';
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
  try {
    yield call(axios.request, { method: 'post', url: `${apiEndpoint}/products/${original.identifier}`, data: product });
    yield put<Actions.PRODUCT_SAVE_SUCCESS>({ type: Actions.PRODUCT_SAVE_SUCCESS });
  } catch (error) {
    yield put<Actions.PRODUCT_SAVE_ERROR>({ error, type: Actions.PRODUCT_SAVE_ERROR });
  }
}

export function * deleteProduct({ identifier }: Actions.PRODUCT_DELETED) {
  try {
    yield call(axios.request, { method: 'delete', url: `${apiEndpoint}/products/${identifier}` });
    yield put<Actions.PRODUCT_DELETE_SUCCESS>({ type: Actions.PRODUCT_DELETE_SUCCESS });
    yield put<Actions.GET_ORDERS_REQUEST>({ type: Actions.GET_ORDERS_REQUEST });
  } catch (error) {
    yield put<Actions.PRODUCT_DELETE_ERROR>({ error, type: Actions.PRODUCT_DELETE_ERROR });
  }
}

export default [
  takeLatest(Actions.GET_ORDERS_REQUEST, getOrders),
  takeLatest(Actions.PRODUCT_SAVED, saveProduct),
  takeLatest(Actions.PRODUCT_DELETED, deleteProduct),
];
