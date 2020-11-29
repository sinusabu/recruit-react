import React from 'react';
import {IFieldProps} from '../interfaces/RegistrationFormType';

function RegistrationFormField(props: IFieldProps) {
  return (
    <tr className="Registration">
      <td>{props.label}</td>
      <td><input
          type="text" 
          aria-labelledby={props.fieldName}
          name={props.fieldName} 
          id={props.fieldName} 
          className={props.fieldName} 
          value={props.value} 
          onChange={(e) => props.onChange(props.fieldType, e.target.value)}
      /></td>
    </tr>
  );
}

export default RegistrationFormField;



