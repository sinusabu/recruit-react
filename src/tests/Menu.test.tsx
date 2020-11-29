import React from 'react';
import { shallow } from 'enzyme';
import Menu from '../components/Menu';
import {IMenuProps} from '../interfaces/MenuProps';

describe("Menu", () => {
  const onClick = jest.fn();

  const props: IMenuProps = {
    onHeaderClick: onClick,
  };

  const renderComponent = () => shallow(<Menu {...props} />);
  let component: any;

  beforeEach(() => {
    component = renderComponent();
  });

  test("renders menu components", () => {
    const pComponent = component.find('p');
    const divComponent = component.find('div');
    const headerComponent = component.find('p');

    expect(pComponent.exists()).toBe(true);
    expect(divComponent.exists()).toBe(true);
    expect(headerComponent.exists()).toBe(true);
  });
});


