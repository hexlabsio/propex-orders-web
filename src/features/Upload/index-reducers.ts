import { Reducer } from 'redux';
import * as Actions from './index-actions';
import { default as initialState, UploadState } from './index-state';
import { Product } from '../Orders/index-state';

const reducer: Reducer<UploadState, Actions.ACTIONS> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ORDER_FOUND: return { ...state, productAdded: false, orders: [...state.orders, action.order] };
    case Actions.UPLOAD_CLEARED: return { ...state, productAdded: false, orders: [] };
    case Actions.MODEL_FOUND: return modifyLatestProduct(state, product => ({ ...product, model: action.model }));
    case Actions.SERIAL_FOUND: return modifyLatestProduct(state, product => ({ ...product, serial: action.serial }));
    default: return state;
  }
};

const modifyLatestProduct = (state: UploadState, operation: (product: Product) => Product): UploadState  => {
  if (state.orders.length === 0) return state;
  const latestOrder = state.orders[state.orders.length - 1];
  if (!state.productAdded || latestOrder.products.length === 0) {
    const updatedProduct = operation({ model: '', serial: '' });
    const updatedOrder = { ...latestOrder, products: [...latestOrder.products, updatedProduct] };
    return { ...state, productAdded: true,  orders: replaceOrAddLast(state.orders, updatedOrder) };
  }
  const updatedProduct = operation(latestOrder.products[latestOrder.products.length - 1]);
  const updatedOrder = { ...latestOrder, products: replaceOrAddLast(latestOrder.products, updatedProduct) };
  return { ...state, productAdded: false, orders: replaceOrAddLast(state.orders, updatedOrder) };
};

const replaceOrAddLast = <T>(array: T[], item: T) => array.length === 0 ? [item] : [...array.slice(0, array.length - 1), item];

export default reducer;
