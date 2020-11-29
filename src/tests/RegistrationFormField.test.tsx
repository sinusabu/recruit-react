import React from 'react';
import { shallow } from 'enzyme';
import RegistrationFormField from '../components/RegistrationFormField';
import {IFieldProps} from '../interfaces/RegistrationFormType';

describe("RegistrationFormField", () => {
  const onFieldChange = jest.fn();

  const props: IFieldProps = {
    fieldName:"testfield",
    fieldType: 1,
    label: "testlabel",
    value: "testvalue",
    onChange: onFieldChange
  };

  const renderComponent = () => shallow(<RegistrationFormField {...props} />);
  let component: any;

  beforeEach(() => {
    component = renderComponent();
  });

  test("renders a table row", () => {
    const trComponent = component.find('tr');

    expect(trComponent.exists()).toBe(true);
    expect(trComponent.length).toEqual(1);
  });

  test("renders table columns", () => {
    const tdComponent = component.find('td');

    expect(tdComponent.exists()).toBe(true);
    expect(tdComponent.first().text()).toBe(props.label);
    expect(tdComponent.length).toEqual(2);
  });

  test("renders input component", () => {
    const inputComponent = component.find('input');

    expect(inputComponent.exists()).toBe(true);
    expect(inputComponent.props().id).toEqual(props.fieldName);
    expect(inputComponent.props().name).toEqual(props.fieldName);
    expect(inputComponent.props().className).toEqual(props.fieldName);
    expect(inputComponent.props().value).toEqual(props.value);
  });

  test("should test onChange event", () => {
    const inputComponent = component.find('input');
    const event = {target: {name: "testfield", value: "test"}};

    inputComponent.simulate('change', event);
    expect(onFieldChange).toHaveBeenCalled();
  });
});


