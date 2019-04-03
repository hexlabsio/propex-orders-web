import { Order } from '../Orders/index-state';

export interface UploadState {
  productAdded: boolean;
  orders: Order[];
}

const initialState: UploadState = {
  orders: [],
  productAdded: false,
};

export default initialState;
