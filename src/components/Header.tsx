import React from 'react';
import burgerLogo from '../images/burger.png';
import arrowLogo from '../images/leftarrow.png';
import HeaderProps from '../interfaces/HeaderPropsType';
import {HeaderTypeEnum} from '../enum/HeaderTypeEnum';
import '../styles/Header.css';

function Header(props: HeaderProps) {
  const getHeaderImage = (type: number):string => {
    return type === HeaderTypeEnum.REGISTRATION 
      ? burgerLogo
      : arrowLogo
  }
  
  const onHeaderClick = (type: number) => {
    console.log('Header clicked ', type);
    props.onHeaderClick(type);
  }
  console.log("Header props ", props);
  return (
    <div className="Header" >
    <img 
        src={getHeaderImage(props.type)} 
        onClick={() => onHeaderClick(props.type)}
        className="Header-logo" 
        alt="headerLogo"
      />
      <div className="Header-title">{props.title}</div>
      <hr/>
    </div>
  );
}

export default Header;
