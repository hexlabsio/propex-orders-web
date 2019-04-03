import { default as React } from 'react';
import { Order, OrdersState, Product } from './index-state';
import { GET_ORDERS_REQUEST, getOrders, SEARCH_UPDATED, searchUpdated } from './index-actions';
import { connect } from 'react-redux';
import { RootState } from '../../index-state';
import { default as OrderPanel } from './components/OrderPanel';
import { default as ProductPanel } from  './components/ProductPanel';
import './index.sass';

interface StateProps extends OrdersState { }

interface ActionProps {
  getOrders: () => GET_ORDERS_REQUEST;
  searchUpdated: (search: string) => SEARCH_UPDATED;
}

export interface Props extends StateProps, ActionProps { }

export class Orders extends React.Component<Props> {

  componentDidMount() {
    if (this.props.orders.length === 0) this.props.getOrders();
  }

  static matches(item: string, filter: string): boolean {
    const filters = filter.split(' ');
    return !!filters.find(filter => item.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }

  static productMatches(product: Product, filter: string): boolean {
    return Orders.matches(product.model, filter) || Orders.matches(product.serial, filter);
  }

  static orderMatches(order: Order, filter: string): boolean {
    return Orders.matches(order.order, filter) || !!order.products.find(product => Orders.productMatches(product, filter));
  }

  render(): React.ReactNode {
    const filteredOrders = this.props.searchText === '' ? this.props.orders : this.props.orders.filter(order => Orders.orderMatches(order, this.props.searchText))
      .map(order => ({ ...order, products: order.products.filter(product => Orders.productMatches(product, this.props.searchText)) }));
    return (
      <div className="orders-container">
        <OrderPanel orders={filteredOrders} loading={this.props.loading}/>
        <ProductPanel  {...this.props} orders={filteredOrders}/>
      </div>
    );
  }
}

export const stateToProps: (state: RootState) => StateProps = state => ({
  ...state.orders,
});

const dispatchToProps: ActionProps = { getOrders, searchUpdated };

export default connect(stateToProps, dispatchToProps)(Orders);
