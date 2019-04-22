import { takeLatest, put, call } from 'redux-saga/effects';
import * as Actions from './index-actions';
import { default as axios, AxiosResponse } from 'axios';
import { Order } from './index-state';
import { Collection } from '../../index-state';
import { apiEndpoint } from '../../index';
import { push } from 'connected-react-router';
import { default as moment } from 'moment';
import qs from 'qs';

export function * getOrders() {
  try {
    const orderResponse: AxiosResponse<Collection<Order>> = yield call(axios.request, { url: `${apiEndpoint}/orders` });
    yield put<Actions.GET_ORDERS_SUCCESS>({ type: Actions.GET_ORDERS_SUCCESS, orders: orderResponse.data.member });
  } catch (error) {
    yield put<Actions.GET_ORDERS_ERROR>({ error, type: Actions.GET_ORDERS_ERROR });
  }
}
export function * exportOrders() {
  try {
    const exportResponse: AxiosResponse<string> = yield call(axios.request, { url: `${apiEndpoint}/orders/export` });
    yield put<Actions.EXPORT_SUCCESS>({ type: Actions.EXPORT_SUCCESS, file: exportResponse.data });
  } catch (error) {
    yield put<Actions.EXPORT_ERROR>({ error, type: Actions.EXPORT_ERROR });
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

export function * deleteProduct({ product }: Actions.PRODUCT_DELETED) {
  try {
    yield call(axios.request, { method: 'delete', url: `${apiEndpoint}/products/${product.identifier}` });
    yield put<Actions.PRODUCT_DELETE_SUCCESS>({ identifier: product.identifier, type: Actions.PRODUCT_DELETE_SUCCESS });
    yield put<Actions.RELOAD_ORDERS_REQUEST>({ type: Actions.RELOAD_ORDERS_REQUEST });
  } catch (error) {
    yield put<Actions.PRODUCT_DELETE_ERROR>({ error, type: Actions.PRODUCT_DELETE_ERROR });
  }
}

export function * dateFilterUpdated({ start, end }: Actions.DATE_FILTER_UPDATED) {
  yield put(push(`/orders?${qs.stringify({
    startDate: start ? moment(start).unix() : undefined,
    endDate: end ? moment(end).unix() : undefined,
  })}`));
}

export default [
  takeLatest(Actions.GET_ORDERS_REQUEST, getOrders),
  takeLatest(Actions.RELOAD_ORDERS_REQUEST, getOrders),
  takeLatest(Actions.PRODUCT_SAVED, saveProduct),
  takeLatest(Actions.PRODUCT_DELETED, deleteProduct),
  takeLatest(Actions.EXPORT_REQUEST, exportOrders),
  takeLatest(Actions.DATE_FILTER_UPDATED, dateFilterUpdated),
];
