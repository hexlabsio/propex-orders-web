import { default as React } from 'react';
import { Order } from '../index-state';
import { order as OrderComponent } from './OrderPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import './OrderPanel.sass';

export interface Props {
  orders: Order[];
  loading: boolean;
}

export const order = (order: Order) => {
  const time = moment.unix(order.dateTime).format('Do MMM YYYY');
  const scrollTo = () => {
    const item = document.getElementById(`product-${order.identifier}`);
    if (item) item.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
      <div id={`order-${order.identifier}`} className="order" onClick={scrollTo}>
        <div className="order-name">{order.order}</div>
        <div className="order-time">{time}</div>
      </div>
  );
};

const orderPanel = ({ orders = [], loading = false }: Props) => {
  return (
    <div id="order-panel" className="order-panel">
      <div className={`order-panel-top ${orders.length === 0 ? 'empty' : 'full'}`}>
        {loading ? <FontAwesomeIcon spin={true} icon={faSpinner}/> : (orders.length === 0 ? 'No Orders Found' : `All Orders (${orders.length})`)}
      </div>
      <div className="order-panel-content">
        {orders.map((order, index) => <OrderComponent {...order} key={`${index}_${order.order}`} />)}
      </div>
    </div>
  );
};

export default orderPanel;
