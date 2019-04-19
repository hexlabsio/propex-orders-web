import { default as React } from 'react';
import { Order, Product, ProductEvents } from '../index-state';
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faSave, faBan } from '@fortawesome/free-solid-svg-icons';

export interface Props {
  order: Order;
  productInEdit?: Product;
  onClick?: (order: Order) => void;
  productEvents: ProductEvents;
}

export const order = ({ order, productInEdit, productEvents, onClick = () => {} }: Props) => {
  const time = moment.unix(order.dateTime).format('Do MMM YYYY');
  const productRow = (product: Product, index: number) => {
    const inEdit = productInEdit && product.identifier === productInEdit.identifier;
    const otherInEdit = !!productInEdit;
    const defaultActions = (
        <>
          <div className="enabled-action" onClick={() => productEvents.editClicked(product)}><FontAwesomeIcon icon={faPencilAlt} /></div>
          <div className="enabled-action" onClick={() => productEvents.deleteClicked(product.identifier)}><FontAwesomeIcon icon={faTrash} /></div>
        </>
    );
    const canSave = productInEdit && inEdit && ((productInEdit.model !== product.model) || (productInEdit.serial !== product.serial));
    const inEditActions = (
      <>
        <div className={canSave ? 'enabled-action' : 'disabled-action'} onClick={() => canSave && productInEdit && productEvents.saveClicked(product, productInEdit)}>
          <FontAwesomeIcon icon={faSave} />
        </div>
        <div className="enabled-action" onClick={() => productEvents.cancelClicked(product.identifier)}><FontAwesomeIcon icon={faBan} /></div>
      </>
    );
    return (
      <div className="row" key={product.identifier}>
        <div className="cell-s">{index + 1}</div>
        <div className="cell">
          <input
            type="text"
            className={`product-input model-input ${inEdit ? 'active' : ''}`}
            onChange={e => productEvents.modelUpdated(product.identifier, e.target.value)}
            readOnly={!inEdit}
            size={34}
            value={product.model}
          />
        </div>
        <div className="cell">
          <input
            type="text"
            className={`product-input serial-input ${inEdit ? 'active' : ''}`}
            onChange={e => productEvents.serialUpdated(product.identifier, e.target.value)}
            readOnly={!inEdit}
            size={34}
            value={product.serial}
          />
        </div>
        <div className="cell product-actions">
          {inEdit ? inEditActions : (otherInEdit ? <div/> : defaultActions)}
        </div>
      </div>
    );
  };
  return (
    <div id={`product-${order.identifier}`} className="order-products">
      <div className="order-products-content">
        <div className="header-row">
          <div className="cell-s" onClick={() => onClick(order)}>
            <div className="order-name">{order.order}</div>
            <div className="order-time">{time}</div>
          </div>
          <div className="cell">Model</div>
          <div className="cell">Serial</div>
          <div className="cell"/>
        </div>
        {order.products.map(productRow)}
      </div>
    </div>
  );
};

export default order;
