import { Reducer } from 'redux';
import * as Actions from './index-actions';
import { default as initialState, OrdersState } from './index-state';

const reducer: Reducer<OrdersState, Actions.ACTIONS> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ORDERS_SUCCESS: return { ...state };
    default: return state;
  }
};

export default reducer;
