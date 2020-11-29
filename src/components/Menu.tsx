import React from 'react';
import Header from './Header';
import {HeaderTypeEnum} from '../enum/HeaderTypeEnum';
import {IMenuProps} from '../interfaces/MenuProps';

function Menu(props: IMenuProps) {
  console.log('Menu class');
  return (
    <div className="Menu">
      <Header 
        type={HeaderTypeEnum.MENU} 
        title="Menu" 
        onHeaderClick={props.onHeaderClick}
      />
      <p>This is menu content</p>
    </div>
  );
}

export default Menu;
