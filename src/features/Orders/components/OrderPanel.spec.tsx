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
  it('should render with message when no orders', () => {
    const orderPanel = shallow(<OrderPanel orders={[]} loading={false}/>);
    const panel = orderPanel.find('.order-panel');
    expect(panel).to.have.lengthOf(1);
    expect(panel.text()).to.equal('No Orders Found');
  });

  it('should render loading icon when loading', () => {
    const orderPanel = mount(<OrderPanel orders={[]} loading={true}/>);
    expect(orderPanel.contains(<FontAwesomeIcon icon={faSpinner} spin={true}/>)).to.be.true;
  });

  it('should list all orders', () => {
    const orders: Order[] = [
      { order: '1', dateTime: '1970-01-01', products: [] },
      { order: '2', dateTime: '1970-01-01', products: [] },
      { order: '3', dateTime: '1970-01-03', products: [] },
    ];
    const orderPanel = mount(<OrderPanel orders={orders} loading={false}/>);
    const renderedOrders = orderPanel.find('.order');
    expect(renderedOrders).to.have.lengthOf(3);
    expect(renderedOrders.first().find('.order-name').text()).to.equal('1');
    expect(renderedOrders.first().find('.order-time').text()).to.equal('1st Jan 1970');
    expect(renderedOrders.last().find('.order-name').text()).to.equal('3');
    expect(renderedOrders.last().find('.order-time').text()).to.equal('3rd Jan 1970');
  });

  it('should display human readable date format', () => {
    const orders: Order[] = [
      { order: '1', dateTime: '2019-04-01', products: [] },
    ];
    const orderPanel = mount(<OrderPanel orders={orders} loading={false}/>);
    expect(orderPanel.find('.order-time').text()).to.equal('1st Apr 2019');
  });
});
