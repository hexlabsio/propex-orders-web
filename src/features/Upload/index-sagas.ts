import { takeLatest, put, call } from 'redux-saga/effects';
import * as Actions from './index-actions';
import * as OrdersActions from '../Orders/index-actions';
import { default as axios } from 'axios';
import { apiEndpoint } from '../../index';
import { push } from 'connected-react-router';

export function * uploadOrders(action: Actions.UPLOAD_REQUESTED) {
  try {
    yield call(axios.request, { url: `${apiEndpoint}/orders`, method: 'POST', data: { orders: action.orders } });
    yield put<Actions.UPLOAD_SUCCESS>({ type: Actions.UPLOAD_SUCCESS });
    yield put(push('/orders'));
    yield put<OrdersActions.GET_ORDERS_REQUEST>({ type: OrdersActions.GET_ORDERS_REQUEST });
  } catch (error) {
    yield put<Actions.UPLOAD_ERROR>({ error, type: Actions.UPLOAD_ERROR });
  }
}

export default [
  takeLatest(Actions.UPLOAD_REQUESTED, uploadOrders),
];
