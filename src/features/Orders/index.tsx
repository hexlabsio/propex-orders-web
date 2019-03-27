import { default as React } from 'react';
import { OrdersState } from './index-state';
import { getOrders } from './index-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../index-state';

interface StateProps extends OrdersState { }

interface ActionProps {
  getOrders: () => any;
}

export interface Props extends StateProps, ActionProps{

}

export class Orders extends React.Component<Props> {
  render(): React.ReactNode {
    return <div onClick={() => this.props.getOrders()}>Hello</div>;
  }
}

export const stateToProps: (state: RootState) => StateProps = state => ({
  ...state.orders,
});

export default connect(stateToProps, dispatch => bindActionCreators({ getOrders }, dispatch))(Orders);
