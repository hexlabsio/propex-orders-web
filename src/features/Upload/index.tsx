import { default as React } from 'react';
import { UploadState } from './index-state';
import { connect } from 'react-redux';
import { RootState } from '../../index-state';
import './index.sass';
import { Order } from '../Orders/index-state';
import { default as OrderComponent } from '../Orders/components/Order';
import * as moment from 'moment';
import OperationBar, { Operation } from '../Orders/components/OperationBar';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { orderFound, modelFound, serialFound, clearUpload, uploadRequested } from './index-actions';

interface StateProps extends UploadState { }

interface ActionProps {
  orderFound: (order: Order) => void;
  modelFound: (model: string) => void;
  serialFound: (serial: string) => void;
  clearUpload: () => void;
  uploadRequested: (orders: Order[]) => void;
}

export interface Props extends StateProps, ActionProps { }

export class Upload extends React.Component<Props> {

  componentDidMount() {
    this.focusBarcodeInput();
  }

  static barcodeInput(): HTMLInputElement { return document.getElementById('barcode-input') as HTMLInputElement; }
  static barcodeInputHasFocus() { return document.hasFocus() && document.activeElement === Upload.barcodeInput(); }
  focusBarcodeInput() { Upload.barcodeInput().focus(); this.setState({}); }

  render(): React.ReactNode {
    const onChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const input = e.target as HTMLInputElement;
        const item = input.value;
        input.value = '';
        if (item.length === 5) this.props.orderFound({ order: item, dateTime: moment.utc().unix(), products: [] });
        else if (this.props.productAdded) this.props.serialFound(item);
        else this.props.modelFound(item);
      }
    };
    const orders = this.props.orders;
    const operations: Operation[] = [
      { key: 'upload', label: 'Upload', icon: faUpload, loading: false, displayed: true, enabled: orders.length > 0 },
      { key: 'clear', label: 'Clear', icon: faWindowClose, loading: false, displayed: true, enabled: orders.length > 0 },
    ];
    const operationClicked = (operation: string) => {
      switch (operation) {
        case 'upload': {
          this.props.uploadRequested(this.props.orders);
          break;
        }
        default: {
          this.focusBarcodeInput();
          this.props.clearUpload();
        }
      }
    };
    return (
      <div className="upload-container">
        <div className="products-panel">
          <div className="products-panel-top barcode-wrapper">
              <Link to="/orders" className="back">
                <div className="back-text">{'< Back'}</div>
              </Link>
            <input
              id="barcode-input"
              autoComplete="off"
              type="text"
              className="barcode-input"
              onBlur={() => this.setState({})}
              onFocus={() => this.setState({})}
              placeholder={Upload.barcodeInputHasFocus() ? 'Scan \'Data Upload\' Barcode ...' : 'Click here to begin'}
              onKeyPress={onChange}
            />
            <OperationBar  operations={operations} operationClicked={operationClicked}/>
          </div>
          <div className="products-panel-content upload-content">
            {orders.map(order => <OrderComponent key={order.order} order={order} />)}
          </div>
        </div>
      </div>
    );
  }
}

export const stateToProps: (state: RootState) => StateProps = state => ({
  ...state.upload,
});

const dispatchToProps: ActionProps = { orderFound, modelFound, serialFound, clearUpload, uploadRequested };

export default connect(stateToProps, dispatchToProps)(Upload);
