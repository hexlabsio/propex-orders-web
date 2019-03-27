import { OrdersState, default as initialOrdersState } from './features/Orders/index-state';

export interface RootState {
  orders: OrdersState;
}

const initialRootState: RootState = {
  orders: initialOrdersState,
};

export default initialRootState;
