import { default as React } from 'react';
import { default as Enzyme, shallow, mount } from 'enzyme';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import ProductPanel from './ProductPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Order } from '../index-state';
import { MemoryRouter } from 'react-router';
import { Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('<ProductPanel />', () => {
  it('should render with message when no orders', () => {
    const productsPanel = mount(<MemoryRouter><ProductPanel /></MemoryRouter>);
    const panel = productsPanel.find('.products-panel');
    expect(panel).to.have.lengthOf(1);
    expect(panel.text()).to.equal('No Orders Found Click here to upload some now.');
    expect(panel.contains(<Link to="/upload">Click here</Link>)).to.be.true;
  });

  it('should render loading icon when loading', () => {
    const productsPanel = mount(<ProductPanel loading={true}/>);
    expect(productsPanel.contains(<FontAwesomeIcon className="loading-icon" icon={faSpinner} spin={true}/>)).to.be.true;
  });

  it('should list all orders and products', () => {
    const orders: Order[] = [
      { identifier: '1', order: '1', dateTime: '1970-01-01', products: [
          { identifier: 'a', serial: 'a', model: 'b' },
          { identifier: 'b', serial: 'c', model: 'd' },
      ] },
      { identifier: '2', order: '2', dateTime: '1970-01-03', products: [
          { identifier: 'c', serial: 'e', model: 'f' },
      ] },
    ];
    const productsPanel = mount(<MemoryRouter><ProductPanel orders={orders}/></MemoryRouter>);
    const renderedOrders = productsPanel.find('.order-products');
    expect(renderedOrders).to.have.lengthOf(2);

    expect(renderedOrders.first().find('.order-name').text()).to.equal('1');
    expect(renderedOrders.first().find('.order-time').text()).to.equal('1st Jan 1970');
    const productRows = renderedOrders.first().find('.row');
    expect(productRows).to.have.lengthOf(2);
    const firstRowCells = productRows.first().find('.cell');
    expect(firstRowCells).to.have.lengthOf(3);
    const cellContent = firstRowCells.map(cell => cell.childAt(0).props().value);
    expect(cellContent[0], 'b');
    expect(cellContent[0], 'a');
    const lastRowCells = productRows.last().find('.cell');
    expect(lastRowCells).to.have.lengthOf(3);
    const cell2Content = lastRowCells.map(cell => cell.childAt(0).props().value);
    expect(cell2Content[0], 'd');
    expect(cell2Content[0], 'c');

    expect(renderedOrders.last().find('.order-name').text()).to.equal('2');
    expect(renderedOrders.last().find('.order-time').text()).to.equal('3rd Jan 1970');
    const productRows2 = renderedOrders.last().find('.row');
    expect(productRows2).to.have.lengthOf(1);
  });
});
