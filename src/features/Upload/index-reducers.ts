import { Reducer } from 'redux';
import * as Actions from './index-actions';
import { default as initialState, UploadState } from './index-state';
import { Product } from '../Orders/index-state';
import uuid from 'uuid';

const ROUTER_LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const reducer: Reducer<UploadState, Actions.ACTIONS | { type: typeof ROUTER_LOCATION_CHANGE}> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ORDER_FOUND: return { ...state, productAdded: false, orders: [...state.orders, action.order] };
    case ROUTER_LOCATION_CHANGE:
    case Actions.UPLOAD_CLEARED: return { ...state, productAdded: false, orders: [] };
    case Actions.UPLOAD_REQUESTED: return { ...state, uploading: true };
    case Actions.UPLOAD_SUCCESS:
    case Actions.UPLOAD_ERROR: return { ...state, uploading: false };
    case Actions.MODEL_FOUND: return modifyLatestProduct(state, product => ({ ...product, model: action.model }));
    case Actions.SERIAL_FOUND: return modifyLatestProduct(state, product => ({ ...product, serial: action.serial }));
    default: return state;
  }
};

const modifyLatestProduct = (state: UploadState, operation: (product: Product) => Product): UploadState  => {
  if (state.orders.length === 0) return state;
  const latestOrder = state.orders[state.orders.length - 1];
  if (!state.productAdded || latestOrder.products.length === 0) {
    const updatedProduct = operation({ identifier: uuid(), model: '', serial: '' });
    const updatedOrder = { ...latestOrder, products: [...latestOrder.products, updatedProduct] };
    return { ...state, productAdded: true,  orders: replaceOrAddLast(state.orders, updatedOrder) };
  }
  const updatedProduct = operation(latestOrder.products[latestOrder.products.length - 1]);
  const updatedOrder = { ...latestOrder, products: replaceOrAddLast(latestOrder.products, updatedProduct) };
  return { ...state, productAdded: false, orders: replaceOrAddLast(state.orders, updatedOrder) };
};

const replaceOrAddLast = <T>(array: T[], item: T) => array.length === 0 ? [item] : [...array.slice(0, array.length - 1), item];

export default reducer;
