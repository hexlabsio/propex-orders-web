import { Reducer } from 'redux';
import * as Actions from './index-actions';
import { default as initialState, Order, OrdersState, Product } from './index-state';

const reducer: Reducer<OrdersState, Actions.ACTIONS> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ORDERS_REQUEST: return { ...state, error: undefined, loading: true };
    case Actions.RELOAD_ORDERS_REQUEST: return { ...state, error: undefined, reloading: true, activeProduct: undefined };
    case Actions.GET_ORDERS_SUCCESS: return { ...state, error: undefined, loading: false, reloading: false, orders: action.orders };
    case Actions.GET_ORDERS_ERROR: return { ...state, error: action.error, loading: false, reloading: false };
    case Actions.SEARCH_UPDATED: return { ...state, searchText: action.search };
    case Actions.PRODUCT_EDIT_CLICKED: return { ...state, activeProduct: { product: { ...action.product }, original: action.product, saving: false, deleting: false } };
    case Actions.PRODUCT_EDIT_CANCELED:
    case Actions.PRODUCT_SAVE_SUCCESS: return { ...state, activeProduct: undefined };
    case Actions.PRODUCT_SAVE_ERROR: return state.activeProduct ? { ...state, activeProduct: { ...state.activeProduct, saving: false, error: action.error } } : state;
    case Actions.PRODUCT_DELETE_SUCCESS: return state.activeProduct ? {
      ...state,
      activeProduct: { ...state.activeProduct, deleting: false },
      orders: replaceProduct(state.orders)(action.identifier),
    } : state;
    case Actions.PRODUCT_DELETE_ERROR: return state.activeProduct ? { ...state, activeProduct: { ...state.activeProduct, deleting: false, error: action.error } } : state;
    case Actions.PRODUCT_SAVED: return state.activeProduct ? { ...state, activeProduct: { ...state.activeProduct, saving: true } } : state;
    case Actions.PRODUCT_DELETED: return { ...state, activeProduct: { product: { ...action.product }, original: action.product, saving: false, deleting: true } };
    case Actions.PRODUCT_MODEL_UPDATED: return { ...state, orders: replaceProduct(state.orders)(action.identifier, product => ({ ...product, model: action.model })) };
    case Actions.PRODUCT_SERIAL_UPDATED: return { ...state, orders: replaceProduct(state.orders)(action.identifier, product => ({ ...product, serial: action.serial })) };
    default: return state;
  }
};

const replaceProduct = (orders: Order[]) => (identifier: string, transform?: (old: Product) => Product) => {
  const index = orders.findIndex(order => order.products.find(product => product.identifier === identifier) !== undefined);
  debugger;
  if (index >= 0) {
    const order = orders[index];
    const productIndex = order.products.findIndex(product => product.identifier === identifier);
    return inject(orders, index, { ...order, products: inject(order.products, productIndex, transform ? transform(order.products[productIndex]) : undefined) });
  }
  return orders;
};

const inject: <T>(array: T[], index: number, item?: T) => T[] = (array, index, item) => {
  if (item) return [...array.slice(0, index), item, ...array.slice(index + 1)];
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export default reducer;
