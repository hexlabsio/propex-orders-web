import { Order, Product } from './index-state';

export const GET_ORDERS_REQUEST = '@@orders/GET_ORDERS_REQUEST';
export const RELOAD_ORDERS_REQUEST = '@@orders/RELOAD_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = '@@orders/GET_ORDERS_SUCCESS';
export const GET_ORDERS_ERROR = '@@orders/GET_ORDERS_ERROR';
export type GET_ORDERS_REQUEST = { type: typeof GET_ORDERS_REQUEST };
export type RELOAD_ORDERS_REQUEST = { type: typeof RELOAD_ORDERS_REQUEST };
export type GET_ORDERS_SUCCESS = { type: typeof GET_ORDERS_SUCCESS, orders: Order[] };
export type GET_ORDERS_ERROR = { type: typeof GET_ORDERS_ERROR, error: Error };

type ORDERS_ACTIONS = GET_ORDERS_REQUEST | RELOAD_ORDERS_REQUEST | GET_ORDERS_SUCCESS | GET_ORDERS_ERROR;

export const EXPORT_REQUEST = '@@orders/EXPORT_REQUEST';
export const EXPORT_SUCCESS = '@@orders/EXPORT_SUCCESS';
export const EXPORT_ERROR = '@@orders/EXPORT_ERROR';
export type EXPORT_REQUEST = { type: typeof EXPORT_REQUEST };
export type EXPORT_SUCCESS = { type: typeof EXPORT_SUCCESS, file: string };
export type EXPORT_ERROR = { type: typeof EXPORT_ERROR, error: Error };

type EXPORT_ACTIONS = EXPORT_REQUEST | EXPORT_SUCCESS | EXPORT_ERROR;

export const SEARCH_UPDATED = '@@orders/SEARCH_UPDATED';
export type SEARCH_UPDATED = { type: typeof SEARCH_UPDATED, search: string };
export const DATE_FILTER_UPDATED = '@@orders/DATE_FILTER_UPDATED';
export type DATE_FILTER_UPDATED = { type: typeof DATE_FILTER_UPDATED, start?: Date, end?: Date };

export const PRODUCT_EDIT_CLICKED = '@@orders/PRODUCT_EDIT_CLICKED';
export const PRODUCT_MODEL_UPDATED = '@@orders/PRODUCT_MODEL_UPDATED';
export const PRODUCT_SERIAL_UPDATED = '@@orders/PRODUCT_SERIAL_UPDATED';
export type PRODUCT_EDIT_CLICKED = { type: typeof PRODUCT_EDIT_CLICKED, product: Product };
export type PRODUCT_MODEL_UPDATED = { type: typeof PRODUCT_MODEL_UPDATED, identifier: string, model: string };
export type PRODUCT_SERIAL_UPDATED = { type: typeof PRODUCT_SERIAL_UPDATED, identifier: string, serial: string };

type EDIT_ACTIONS = PRODUCT_EDIT_CLICKED | PRODUCT_MODEL_UPDATED | PRODUCT_SERIAL_UPDATED;

export const PRODUCT_DELETED = '@@orders/PRODUCT_DELETED';
export const PRODUCT_SAVED = '@@orders/PRODUCT_SAVED';
export const PRODUCT_EDIT_CANCELED = '@@orders/PRODUCT_EDIT_CANCELED';
export const PRODUCT_SAVE_ERROR = '@@orders/PRODUCT_SAVE_ERROR';
export const PRODUCT_SAVE_SUCCESS = '@@orders/PRODUCT_SAVE_SUCCESS';
export const PRODUCT_DELETE_SUCCESS = '@@orders/PRODUCT_DELETE_SUCCESS';
export const PRODUCT_DELETE_ERROR = '@@orders/PRODUCT_DELETE_ERROR';
export type PRODUCT_DELETED = { type: typeof PRODUCT_DELETED, product: Product };
export type PRODUCT_SAVED = { type: typeof PRODUCT_SAVED, product: Product, original: Product };
export type PRODUCT_SAVE_SUCCESS = { type: typeof PRODUCT_SAVE_SUCCESS };
export type PRODUCT_SAVE_ERROR = { type: typeof PRODUCT_SAVE_ERROR, error: Error };
export type PRODUCT_EDIT_CANCELED = { type: typeof PRODUCT_EDIT_CANCELED, identifier: string };
export type PRODUCT_DELETE_SUCCESS = { type: typeof PRODUCT_DELETE_SUCCESS, identifier: string };
export type PRODUCT_DELETE_ERROR = { type: typeof PRODUCT_DELETE_ERROR, error: Error };

export type OPERATION_ACTIONS = PRODUCT_DELETED | PRODUCT_EDIT_CANCELED | PRODUCT_SAVED | PRODUCT_SAVE_SUCCESS | PRODUCT_SAVE_ERROR | PRODUCT_DELETE_SUCCESS | PRODUCT_DELETE_ERROR;

export const getOrders: () => GET_ORDERS_REQUEST = () => ({ type: GET_ORDERS_REQUEST });
export const reload: () => RELOAD_ORDERS_REQUEST = () => ({ type: RELOAD_ORDERS_REQUEST });
export const searchUpdated: (search: string) => SEARCH_UPDATED = search => ({ search, type: SEARCH_UPDATED });
export const productEditClicked: (product: Product) => PRODUCT_EDIT_CLICKED = product => ({ product, type: PRODUCT_EDIT_CLICKED });
export const productModelUpdated: (identifier: string, model: string) => PRODUCT_MODEL_UPDATED = (identifier, model) => ({ identifier, model, type: PRODUCT_MODEL_UPDATED });
export const productSerialUpdated: (identifier: string, serial: string) => PRODUCT_SERIAL_UPDATED = (identifier, serial) => ({ identifier, serial, type: PRODUCT_SERIAL_UPDATED });
export const productDeleted: (product: Product) => PRODUCT_DELETED = product => ({ product, type: PRODUCT_DELETED });
export const productSaveClicked: (product: Product, original: Product) => PRODUCT_SAVED = (product, original) => ({ product, original, type: PRODUCT_SAVED });
export const productEditCanceled: (identifier: string) => PRODUCT_EDIT_CANCELED = identifier => ({ identifier, type: PRODUCT_EDIT_CANCELED });
export const exportClicked: () => EXPORT_REQUEST = () => ({ type: EXPORT_REQUEST });
export const dateFilterUpdated: (start?: Date, end?: Date) => DATE_FILTER_UPDATED = (start, end) => ({ start, end, type: DATE_FILTER_UPDATED });

export type ACTIONS = ORDERS_ACTIONS | EDIT_ACTIONS | OPERATION_ACTIONS | EXPORT_ACTIONS | SEARCH_UPDATED | DATE_FILTER_UPDATED;
