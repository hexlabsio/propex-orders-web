import { default as React } from 'react';
import { Order, Product, ProductEvents } from '../index-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner, faUpload } from '@fortawesome/free-solid-svg-icons';
import { default as OperationBar, Props as OperationBarProps } from './OperationBar';
import { default as OrderComponent } from  './Order';
import './ProductPanel.sass';
import { Link } from 'react-router-dom';

export interface Props {
  orders?: Order[];
  loading?: boolean;
  searchText?: string;
  productInEdit?: Product;
  searchUpdated?: (search: string) => void;
  productEvents?: ProductEvents;
}
const defaultProductEvents: ProductEvents = {
  modelUpdated: () => {},
  serialUpdated: () => {},
  editClicked: () => {},
  deleteClicked: () => {},
  saveClicked: () => {},
  cancelClicked: () => {},
};

const productPanel = ({ orders = [], loading = false, searchText = '', productInEdit, productEvents = defaultProductEvents, searchUpdated = () => {} }: Props) => {
  const operationBarProps: OperationBarProps = {
    search: { text: searchText, onChange: searchUpdated },
    operations: [
      { key: 'upload', label: 'Upload', enabled: true, displayed: true, loading: false, icon: faUpload, link: '/upload' },
      { key: 'export', label: 'Export', enabled: true, displayed: true, loading: false, icon: faDownload },
    ],
    operationClicked: (key: string) => {},
  };
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
        {!loading ? <OperationBar {...operationBarProps}/> : <></>}
      </div>
  );
  return (
    <div className="products-panel">
      {orders.length === 0 && !loading && searchText === '' ? <></> : topPanel()}
      <div className="products-panel-content">
        {loading ? <FontAwesomeIcon icon={faSpinner} spin={true}/> : (orders.length === 0 && searchText === '' ? empty() : orders.map(order => <OrderComponent productEvents={productEvents} productInEdit={productInEdit} order={order} onClick={scrollTo} key={order.identifier} />))}
      </div>
    </div>
  );
};

export default productPanel;
