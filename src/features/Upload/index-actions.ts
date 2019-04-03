import { Order } from '../Orders/index-state';

export const ORDER_FOUND = '@@upload/ORDER_FOUND';
export const MODEL_FOUND = '@@upload/MODEL_FOUND';
export const SERIAL_FOUND = '@@upload/SERIAL_FOUND';
export const UPLOAD_CLEARED = '@@upload/UPLOAD_CLEARED';
export const UPLOAD_REQUESTED = '@@upload/UPLOAD_REQUESTED';

export type ORDER_FOUND = { type: typeof ORDER_FOUND, order: Order };
export type MODEL_FOUND = { type: typeof MODEL_FOUND, model: string };
export type SERIAL_FOUND = { type: typeof SERIAL_FOUND, serial: string };
export type UPLOAD_CLEARED = { type: typeof UPLOAD_CLEARED };
export type UPLOAD_REQUESTED = { type: typeof UPLOAD_REQUESTED, orders: Order[] };

export const orderFound: (order: Order) => ORDER_FOUND = order => ({ order, type: ORDER_FOUND });
export const modelFound: (model: string) => MODEL_FOUND = model => ({ model, type: MODEL_FOUND });
export const serialFound: (serial: string) => SERIAL_FOUND = serial => ({ serial, type: SERIAL_FOUND });
export const clearUpload: () => UPLOAD_CLEARED = () => ({ type: UPLOAD_CLEARED });
export const uploadRequested: (orders: Order[]) => UPLOAD_REQUESTED = orders => ({ orders, type: UPLOAD_REQUESTED });

export type ACTIONS = ORDER_FOUND | MODEL_FOUND | SERIAL_FOUND | UPLOAD_CLEARED;
