import { default as React } from 'react';
import { Order, Product } from '../index-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner, faUpload } from '@fortawesome/free-solid-svg-icons';
import { default as OperationBar, Props as OperationBarProps } from './OperationBar';
import { order as OrderComponent } from  './ProductPanel';
import * as moment from 'moment';
import './ProductPanel.sass';

export interface Props {
  orders?: Order[];
  loading?: boolean;
  searchText?: string;
  searchUpdated?: (search: string) => void;
}

export const order = (order: Order, fullSize: boolean) => {
  const time = moment.unix(order.dateTime).format('Do MMM YYYY');
  const productRow = (product: Product, index: number) => (
    <div className="row" key={`${order.order}-${product.serial}`}>
      <div className="cell-s">{index + 1}</div>
      <div className="cell">{product.model}</div>
      <div className="cell">{product.serial}</div>
    </div>
  );
  const scrollTo = () => {
    const item = document.getElementById(`order-${order.order}`);
    if (item) item.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <div id={`product-${order.order}`} className="order-products">
      <div className="order-products-content">
        <div className="header-row">
          <div className="cell-s" onClick={scrollTo}>
            <div className="order-name">{order.order}</div>
            <div className="order-time">{time}</div>
          </div>
          <div className="cell">Model</div>
          <div className="cell">Serial</div>
        </div>
        {order.products.map(productRow)}
      </div>
    </div>
  );
};

const productPanel = ({ orders = [], loading = false, searchText = '', searchUpdated = () => {} }: Props) => {
  const operationBarProps: OperationBarProps = {
    search: { text: searchText, onChange: searchUpdated },
    operations: [
      { key: 'upload', label: 'Upload', enabled: true, displayed: true, loading: false, icon: faUpload },
      { key: 'export', label: 'Export', enabled: true, displayed: true, loading: false, icon: faDownload },
    ],
    operationClicked: (key: string) => {},
  };
  const empty = () => (
    <div className="products-panel-content">
      <div className="empty-message">
        No Orders Found <a href="#">Click here</a> to upload some now.
      </div>
    </div>
  );
  const topPanel = () => (
      <>
      <div className="products-panel-top">
        {!loading ? <OperationBar {...operationBarProps}/> : <></>}
      </div>
    </>
  );
  return (
    <div className="products-panel">
      {orders.length === 0 && !loading ? empty() : topPanel()}
      <div className="products-panel-content">
        {loading ? <FontAwesomeIcon icon={faSpinner} spin={true}/> : orders.map((order, index) => <OrderComponent {...order} key={`${index}_${order.order}`} />)}
      </div>
    </div>
  );
};

export default productPanel;
