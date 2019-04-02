import { OrdersState, default as initialOrdersState } from './features/Orders/index-state';
import { RouterState } from 'connected-react-router';

export interface RootState {
  router?: RouterState;
  orders: OrdersState;
}

export type Collection<T> = Resource<{}> & {
  totalItems: number;
  member: Resource<T>[];
};

export type Resource<T> = T & {
  id: string;
  context: string;
  operation: ApiOperation[];
};

export interface ApiOperation {
  expects: { $ref: string };
  returns: { $ref: string };
  method: string;
}

const initialRootState: RootState = {
  orders: initialOrdersState,
};

export default initialRootState;
