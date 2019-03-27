
export const GET_ORDERS_REQUEST = '@@orders/GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = '@@orders/GET_ORDERS_SUCCESS';
export const GET_ORDERS_ERROR = '@@orders/GET_ORDERS_ERROR';

export type GET_ORDERS_REQUEST = { type: typeof GET_ORDERS_REQUEST };
export type GET_ORDERS_SUCCESS = { type: typeof GET_ORDERS_SUCCESS };
export type GET_ORDERS_ERROR = { type: typeof GET_ORDERS_ERROR };

type ORDERS_ACTIONS = GET_ORDERS_REQUEST | GET_ORDERS_SUCCESS | GET_ORDERS_ERROR;

export const getOrders: () => GET_ORDERS_REQUEST = () => ({ type: GET_ORDERS_REQUEST });

export type ACTIONS = ORDERS_ACTIONS;
