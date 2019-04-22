import { default as React } from 'react';
import { Order, OrdersState, Product, ProductEvents } from './index-state';
import * as Actions from './index-actions';
import { connect } from 'react-redux';
import { RootState } from '../../index-state';
import { default as OrderPanel } from './components/OrderPanel';
import { default as ProductPanel } from  './components/ProductPanel';
import './index.sass';
import { faDownload, faSyncAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { default as moment } from 'moment';
import { push, RouterState } from 'connected-react-router';
import qs from 'qs';

interface StateProps extends OrdersState {
  router?: RouterState;
}

interface ActionProps {
  getOrders: () => Actions.GET_ORDERS_REQUEST;
  reload: () => Actions.RELOAD_ORDERS_REQUEST;
  searchUpdated: (search: string) => Actions.SEARCH_UPDATED;
  productEditClicked: (product: Product) => Actions.PRODUCT_EDIT_CLICKED;
  productModelUpdated: (identifier: string, model: string) => Actions.PRODUCT_MODEL_UPDATED;
  productSerialUpdated: (identifier: string, serial: string) => Actions.PRODUCT_SERIAL_UPDATED;
  productDeleted: (product: Product) => Actions.PRODUCT_DELETED;
  productSaveClicked: (product: Product, original: Product) => Actions.PRODUCT_SAVED;
  productEditCanceled: (identifier: string) => Actions.PRODUCT_EDIT_CANCELED;
  exportClicked: () => Actions.EXPORT_REQUEST;
  dateFilterUpdated: (start?: Date, end?: Date) => Actions.DATE_FILTER_UPDATED;
}

export interface Props extends StateProps, ActionProps {}

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
    const queryString = this.props.router ? qs.parse(this.props.router.location.search.slice(1)) : undefined;
    const startDate = queryString && queryString.startDate ? moment.unix(queryString.startDate).toDate() : moment().subtract(7, 'days').toDate();
    const endDate = queryString && queryString.endDate ? moment.unix(queryString.endDate).toDate() : moment().add(1, 'days').toDate();
    const toolbar = {
      startDate,
      endDate,
      startDateUpdated: (date: Date) => this.props.dateFilterUpdated(date, endDate),
      endDateUpdated: (date: Date) => this.props.dateFilterUpdated(startDate, date),
    };
    const operationBar = {
      toolbar,
      search: { text: this.props.searchText, onChange: this.props.searchUpdated },
      operations: [
        { key: 'reload', label: '', enabled: true, displayed: true, loading: this.props.reloading, useOwnIconForSpinner: true, icon: faSyncAlt },
        { key: 'upload', label: 'Upload', enabled: true, displayed: true, loading: false, icon: faUpload, link: '/upload' },
        { key: 'export', label: 'Export', enabled: true, displayed: true, loading: false, icon: faDownload },
      ],
      operationClicked: (key: string) => {
        switch (key) {
          case 'export': this.props.exportClicked(); break;
          case 'reload': this.props.reload(); break;
        }
      },
    };
    const filteredOrders = this.props.searchText === '' ? this.props.orders : this.props.orders.filter(order => Orders.orderMatches(order, this.props.searchText))
      .map(order => ({ ...order, products: order.products.filter(product => Orders.productMatches(product, this.props.searchText)) }));
    const productEvents: ProductEvents = {
      modelUpdated: this.props.productModelUpdated,
      serialUpdated: this.props.productSerialUpdated,
      editClicked: this.props.productEditClicked,
      deleteClicked: this.props.productDeleted,
      saveClicked: this.props.productSaveClicked,
      cancelClicked: this.props.productEditCanceled,
    };
    return (
      <div className="orders-container">
        <OrderPanel orders={filteredOrders} loading={this.props.loading}/>
        <ProductPanel {...this.props} operationBar={operationBar} productEvents={productEvents} orders={filteredOrders}/>
      </div>
    );
  }
}

export const stateToProps: (state: RootState) => StateProps = state => ({
  ...state.orders,
  router: state.router,
});

const dispatchToProps: ActionProps = { ...Actions };

export default connect(stateToProps, dispatchToProps)(Orders);
