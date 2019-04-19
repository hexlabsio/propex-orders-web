import { Order, Product } from './index-state';

export const GET_ORDERS_REQUEST = '@@orders/GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = '@@orders/GET_ORDERS_SUCCESS';
export const GET_ORDERS_ERROR = '@@orders/GET_ORDERS_ERROR';

export type GET_ORDERS_REQUEST = { type: typeof GET_ORDERS_REQUEST };
export type GET_ORDERS_SUCCESS = { type: typeof GET_ORDERS_SUCCESS, orders: Order[] };
export type GET_ORDERS_ERROR = { type: typeof GET_ORDERS_ERROR, error: Error };

export const SEARCH_UPDATED = '@@orders/SEARCH_UPDATED';
export const PRODUCT_EDIT_CLICKED = '@@orders/PRODUCT_EDIT_CLICKED';
export const PRODUCT_MODEL_UPDATED = '@@orders/PRODUCT_MODEL_UPDATED';
export const PRODUCT_SERIAL_UPDATED = '@@orders/PRODUCT_SERIAL_UPDATED';
export const PRODUCT_DELETED = '@@orders/PRODUCT_DELETED';
export const PRODUCT_SAVED = '@@orders/PRODUCT_SAVED';
export const PRODUCT_EDIT_CANCELED = '@@orders/PRODUCT_EDIT_CANCELED';
export const PRODUCT_SAVE_ERROR = '@@orders/PRODUCT_SAVE_ERROR';
export const PRODUCT_SAVE_SUCCESS = '@@orders/PRODUCT_SAVE_SUCCESS';

export type SEARCH_UPDATED = { type: typeof SEARCH_UPDATED, search: string };
export type PRODUCT_EDIT_CLICKED = { type: typeof PRODUCT_EDIT_CLICKED, product: Product };
export type PRODUCT_MODEL_UPDATED = { type: typeof PRODUCT_MODEL_UPDATED, identifier: string, model: string };
export type PRODUCT_SERIAL_UPDATED = { type: typeof PRODUCT_SERIAL_UPDATED, identifier: string, serial: string };
export type PRODUCT_DELETED = { type: typeof PRODUCT_DELETED, identifier: string };
export type PRODUCT_SAVED = { type: typeof PRODUCT_SAVED, product: Product, original: Product };
export type PRODUCT_SAVE_SUCCESS = { type: typeof PRODUCT_SAVE_SUCCESS };
export type PRODUCT_SAVE_ERROR = { type: typeof PRODUCT_SAVE_ERROR, error: Error };
export type PRODUCT_EDIT_CANCELED = { type: typeof PRODUCT_EDIT_CANCELED, identifier: string };

type ORDERS_ACTIONS = GET_ORDERS_REQUEST | GET_ORDERS_SUCCESS | GET_ORDERS_ERROR;

export const getOrders: () => GET_ORDERS_REQUEST = () => ({ type: GET_ORDERS_REQUEST });
export const searchUpdated: (search: string) => SEARCH_UPDATED = search => ({ search, type: SEARCH_UPDATED });
export const productEditClicked: (product: Product) => PRODUCT_EDIT_CLICKED = product => ({ product, type: PRODUCT_EDIT_CLICKED });
export const productModelUpdated: (identifier: string, model: string) => PRODUCT_MODEL_UPDATED = (identifier, model) => ({ identifier, model, type: PRODUCT_MODEL_UPDATED });
export const productSerialUpdated: (identifier: string, serial: string) => PRODUCT_SERIAL_UPDATED = (identifier, serial) => ({ identifier, serial, type: PRODUCT_SERIAL_UPDATED });
export const productDeleted: (identifier: string) => PRODUCT_DELETED = identifier => ({ identifier, type: PRODUCT_DELETED });
export const productSaveClicked: (product: Product, original: Product) => PRODUCT_SAVED = (product, original) => ({ product, original, type: PRODUCT_SAVED });
export const productEditCanceled: (identifier: string) => PRODUCT_EDIT_CANCELED = identifier => ({ identifier, type: PRODUCT_EDIT_CANCELED });

export type ACTIONS = ORDERS_ACTIONS |
  SEARCH_UPDATED |
  PRODUCT_EDIT_CLICKED |
  PRODUCT_MODEL_UPDATED |
  PRODUCT_SERIAL_UPDATED |
  PRODUCT_DELETED |
  PRODUCT_EDIT_CANCELED |
  PRODUCT_SAVED |
  PRODUCT_SAVE_SUCCESS;
