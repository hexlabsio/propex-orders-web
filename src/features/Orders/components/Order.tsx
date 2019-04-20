import { default as React } from 'react';
import { ActiveProduct, Order, Product, ProductEvents } from '../index-state';
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faSave, faBan, faSpinner } from '@fortawesome/free-solid-svg-icons';

export interface Props {
  order: Order;
  activeProduct?: ActiveProduct;
  onClick?: (order: Order) => void;
  productEvents: ProductEvents;
}

export const order = ({ order, activeProduct, productEvents, onClick = () => {} }: Props) => {
  const time = moment.unix(order.dateTime).format('Do MMM YYYY');
  const productRow = (product: Product, index: number) => {
    const inEdit = activeProduct && product.identifier === activeProduct.product.identifier;
    const otherInEdit = !!activeProduct;
    const active: ActiveProduct = activeProduct ? activeProduct : { product, original: product, saving: false, deleting: false };
    const defaultActions = (
        <>
          <div className="enabled-action" onClick={() => productEvents.editClicked(product)}><FontAwesomeIcon icon={faPencilAlt} /></div>
          <div className="enabled-action" onClick={() => productEvents.deleteClicked(product.identifier)}><FontAwesomeIcon icon={faTrash} /></div>
        </>
    );
    const canSave = activeProduct && inEdit && ((activeProduct.product.model !== product.model) || (activeProduct.product.serial !== product.serial));
    const inEditActions = (
      <>
        <div className={canSave ? 'enabled-action' : 'disabled-action'} onClick={() => canSave && productEvents.saveClicked(product, product)}>
          {active.saving ? <FontAwesomeIcon spin={true} icon={faSpinner} /> : <FontAwesomeIcon icon={faSave} />}
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
            className={`product-input model-input ${inEdit ? (`active${productEvents ? ' inError' : ''}`) : ''}`}
            onChange={e => productEvents.modelUpdated(product.identifier, e.target.value)}
            readOnly={!inEdit}
            size={34}
            value={product.model}
          />
        </div>
        <div className="cell">
          <input
            type="text"
            className={`product-input serial-input ${inEdit ? (`active${active.error ? ' inError' : ''}`) : ''}`}
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
