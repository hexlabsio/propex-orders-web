import { Reducer } from 'redux';
import * as Actions from './index-actions';
import { default as initialState, OrdersState } from './index-state';

const reducer: Reducer<OrdersState, Actions.ACTIONS> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ORDERS_REQUEST: return { ...state, error: undefined, loading: true };
    case Actions.GET_ORDERS_SUCCESS: return { ...state, error: undefined, loading: false, orders: action.orders };
    case Actions.GET_ORDERS_ERROR: return { ...state, error: action.error, loading: false };
    case Actions.SEARCH_UPDATED: return { ...state, searchText: action.search };
    default: return state;
  }
};

export default reducer;
