import { default as React } from 'react';
import { Order, Product } from '../index-state';
import * as moment from 'moment';

export interface Props {
  order: Order;
  onClick?: (order: Order) => void;
}

export const order = ({ order, onClick = () => {} }: Props) => {
  const time = moment.unix(order.dateTime).format('Do MMM YYYY');
  const productRow = (product: Product, index: number) => (
    <div className="row" key={`${order.order}-${product.serial}`}>
      <div className="cell-s">{index + 1}</div>
      <div className="cell">{product.model}</div>
      <div className="cell">{product.serial}</div>
    </div>
  );
  return (
    <div id={`product-${order.order}`} className="order-products">
      <div className="order-products-content">
        <div className="header-row">
          <div className="cell-s" onClick={() => onClick(order)}>
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

export default order;
