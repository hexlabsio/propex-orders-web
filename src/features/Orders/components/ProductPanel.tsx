import { default as React } from 'react';
import { Order } from '../index-state';
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
  searchUpdated?: (search: string) => void;
}

const productPanel = ({ orders = [], loading = false, searchText = '', searchUpdated = () => {} }: Props) => {
  const operationBarProps: OperationBarProps = {
    search: { text: searchText, onChange: searchUpdated },
    operations: [
      { key: 'upload', label: 'Upload', enabled: true, displayed: true, loading: false, icon: faUpload },
      { key: 'export', label: 'Export', enabled: true, displayed: true, loading: false, icon: faDownload },
    ],
    operationClicked: (key: string) => {},
  };
  const scrollTo = (order: Order) => {
    const item = document.getElementById(`order-${order.order}`);
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
      {orders.length === 0 && !loading ? <></> : topPanel()}
      <div className="products-panel-content">
        {loading ? <FontAwesomeIcon icon={faSpinner} spin={true}/> : (orders.length === 0 ? empty() : orders.map((order, index) => <OrderComponent order={order} onClick={scrollTo} key={`${index}_${order.order}`} />))}
      </div>
    </div>
  );
};

export default productPanel;
