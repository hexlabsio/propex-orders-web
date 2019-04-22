import { Order } from '../Orders/index-state';

export interface UploadState {
  productAdded: boolean;
  orders: Order[];
  uploading: boolean;
}

const initialState: UploadState = {
  orders: [],
  productAdded: false,
  uploading: false,
};

export default initialState;
