import { default as React } from 'react';
import { UploadState } from './index-state';
import { connect } from 'react-redux';
import { RootState } from '../../index-state';
import './index.sass';
import { Order } from '../Orders/index-state';
import { default as OrderComponent } from '../Orders/components/Order';
import chunk from '../../chunk';
import * as moment from 'moment';
import OperationBar, { Operation } from '../Orders/components/OperationBar';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import { faBackspace, faWindowClose } from '@fortawesome/free-solid-svg-icons';

interface StateProps extends UploadState { }

interface ActionProps {
}

export interface Props extends StateProps, ActionProps { }

export interface LocalState {
  groups: Group[];
  hasFocus: boolean;
}
export interface Group {
  name: string;
  items: string[];
}

export class Upload extends React.Component<Props, LocalState> {

  constructor(props: Props) {
    super(props);
    this.state = { groups: [], hasFocus: false };
  }

  componentDidMount() {
    const barcodeInput = document.getElementById('barcode-input');
    if (barcodeInput) barcodeInput.focus();
  }

  barcodeInputHasFocus() {
    const barcodeInput = document.getElementById('barcode-input');
    return document.activeElement === barcodeInput;
  }

  focusChange(focused: boolean) {
    this.setState({ hasFocus: focused });
  }

  render(): React.ReactNode {
    const onChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const item = (e.target as any).value;
        (e.target as any).value = '';
        if (item.length === 5) {
          this.setState({ groups: [...this.state.groups, { name: item, items: [] }] });
        } else if (this.state.groups.length > 0) {
          const latest = this.state.groups[this.state.groups.length - 1];
          const updated = { ...latest, items: [...latest.items, item] };
          this.setState({ groups: [...this.state.groups.slice(0, this.state.groups.length - 1), updated] });
        }
      }
    };
    const orders = this.state.groups.map((group) => {
      const order: Order = {
        order: group.name,
        dateTime: moment.utc().unix(),
        products: chunk(group.items, 2).map(product => ({ model: product[0], serial: product[1] })),
      };
      return order;
    });
    const operations: Operation[] = [
      { key: 'upload', label: 'Upload', icon: faUpload, loading: false, displayed: true, enabled: true },
      { key: 'cancel', label: 'Cancel', icon: faWindowClose, loading: false, displayed: true, enabled: true },
    ];
    return (
      <div className="upload-container">
        <div className="products-panel">
          <div className="products-panel-top barcode-wrapper">
            <input
              id="barcode-input"
              autoComplete="off"
              type="text"
              className="barcode-input"
              onFocus={() => this.focusChange(true)}
              onBlur={() => this.focusChange(false)}
              placeholder={this.barcodeInputHasFocus() ? 'Scan \'Data Upload\' Barcode ...' : 'Click here to begin'}
              onKeyPress={onChange}
            />
            <OperationBar  operations={operations} operationClicked={() => {}}/>
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

const dispatchToProps: ActionProps = {  };

export default connect(stateToProps, dispatchToProps)(Upload);
