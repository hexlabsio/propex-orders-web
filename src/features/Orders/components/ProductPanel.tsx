import { default as React } from 'react';
import { ActiveProduct, Order, ProductEvents } from '../index-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { default as Toolbar, Props as ToolbarProps } from './Toolbar';
import { default as OperationBar, Props as OperationBarProps } from './OperationBar';
import { default as OrderComponent } from  './Order';
import './ProductPanel.sass';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
export interface Props {
  orders?: Order[];
  loading?: boolean;
  searchText?: string;
  activeProduct?: ActiveProduct;
  searchUpdated?: (search: string) => void;
  productEvents?: ProductEvents;
  operationBar?: OperationBarProps;
}
const defaultProductEvents: ProductEvents = {
  modelUpdated: () => {},
  serialUpdated: () => {},
  editClicked: () => {},
  deleteClicked: () => {},
  saveClicked: () => {},
  cancelClicked: () => {},
};

const defaultOperationBar: OperationBarProps = {
  toolbar: {
    startDateUpdated: () => {},
    endDateUpdated: () => {},
  },
  search: { text: '', onChange: () => {} },
  operations: [],
  operationClicked: () => {},
};

const productPanel = (props: Props) => {
  const { orders = [], loading = false, searchText = '', operationBar = defaultOperationBar, productEvents = defaultProductEvents } = props;
  const scrollTo = (order: Order) => {
    const item = document.getElementById(`order-${order.identifier}`);
    if (item) item.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const empty = () => (
    <div className="products-panel-content">
      <div className="empty-message">
        No Orders Found <Link to="/upload">Click here</Link> to upload some now.
      </div>
    </div>
  );
  const topPanel = () => (
      <div className="products-panel-top">
        {!loading ? <OperationBar {...operationBar}/> : <></>}
      </div>
  );
  return (
    <div className="products-panel">
      {orders.length === 0 && !loading && searchText === '' ? <></> : topPanel()}
      <div className="products-panel-content">
        {loading ? <FontAwesomeIcon className="loading-icon" icon={faSpinner} spin={true}/> : (orders.length === 0 && searchText === '' ? empty() : orders.map(order => <OrderComponent productEvents={productEvents} activeProduct={props.activeProduct} order={order} onClick={scrollTo} key={order.identifier} />))}
      </div>
    </div>
  );
};

export default productPanel;
