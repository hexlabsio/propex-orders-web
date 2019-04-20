export interface OrdersState {
  orders: Order[];
  searchText: string;
  loading: boolean;
  error?: Error;
  activeProduct?: ActiveProduct;
}

export interface ActiveProduct {
  product: Product;
  original: Product;
  saving: boolean;
  deleting: boolean;
  error?: Error;
}

export interface Order {
  identifier?: string;
  order: string;
  dateTime: number;
  products: Product[];
}

export interface Product {
  identifier: string;
  serial: string;
  model: string;
}

export interface ProductEvents {
  modelUpdated: (identifier: string, model: string) => void;
  serialUpdated: (identifier: string, serial: string) => void;
  editClicked: (product: Product) => void;
  deleteClicked: (identifier: string) => void;
  saveClicked: (product: Product, original: Product) => void;
  cancelClicked: (identifier: string) => void;
}

const initialState: OrdersState = {
  orders: [],
  searchText: '',
  loading: true,
};

export default initialState;
