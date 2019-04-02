import { default as React } from 'react';
import { default as Enzyme, shallow, mount } from 'enzyme';
import { default as Adapter } from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import OrderPanel from './OrderPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Order } from '../index-state';

Enzyme.configure({ adapter: new Adapter() });

describe('<OrderPanel />', () => {
  it('should render when no orders', () => {
    const orderPanel = shallow(<OrderPanel orders={[]} loading={false}/>);
    expect(orderPanel.find('.order-panel')).to.have.lengthOf(1);
  });

  it('should render loading icon when loading', () => {
    const orderPanel = mount(<OrderPanel orders={[]} loading={true}/>);
    expect(orderPanel.contains(<FontAwesomeIcon icon={faSpinner} spin={true}/>)).to.be.true;
  });

  it('should list all orders', () => {
    const orders: Order[] = [
      { order: '1', dateTime: 1, products: [] },
      { order: '2', dateTime: 2, products: [] },
      { order: '3', dateTime: 176400, products: [] },
    ];
    const orderPanel = mount(<OrderPanel orders={orders} loading={false}/>);
    const renderedOrders = orderPanel.find('.order');
    expect(renderedOrders).to.have.lengthOf(3);
    expect(renderedOrders.first().find('.order-name').text()).to.equal('1');
    expect(renderedOrders.first().find('.order-time').text()).to.equal('1st Jan 1970');
    expect(renderedOrders.last().find('.order-name').text()).to.equal('3');
    expect(renderedOrders.last().find('.order-time').text()).to.equal('3rd Jan 1970');
  });

  it('should display correct date and zone', () => {
    const orders: Order[] = [
      { order: '1', dateTime: 1554119390, products: [] },
    ];
    const orderPanel = mount(<OrderPanel orders={orders} loading={false}/>);
    expect(orderPanel.find('.order-time').text()).to.equal('1st Apr 2019');
  });
});
