export interface OrdersState {
  orders: Order[];
  searchText: string;
  loading: boolean;
  error?: Error;
}

export interface Order {
  order: string;
  dateTime: number;
  products: Product[];
}

export interface Product {
  serial: string;
  model: string;
}

const initialState: OrdersState = {
  orders: [],
  searchText: '',
  loading: true,
};

export default initialState;
