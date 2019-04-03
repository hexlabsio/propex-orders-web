import { default as React } from 'react';
import { OrdersState } from './index-state';
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

  render(): React.ReactNode {
    return (
      <div className="orders-container">
        <OrderPanel {...this.props}/>
        <ProductPanel  {...this.props} searchUpdated={this.props.searchUpdated}/>
      </div>
    );
  }
}

export const stateToProps: (state: RootState) => StateProps = state => ({
  ...state.orders,
});

const dispatchToProps: ActionProps = { getOrders, searchUpdated };

export default connect(stateToProps, dispatchToProps)(Orders);
