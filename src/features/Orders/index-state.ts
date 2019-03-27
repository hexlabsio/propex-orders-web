export interface OrdersState {
  orders: Order[];
}

export interface Order {
  number: number;
}

const initialState: OrdersState = {
  orders: [],
};

export default initialState;
