import React, {useState} from 'react';
import ContainerProps from '../interfaces/ContainerPropsType';
import {HeaderTypeEnum} from '../enum/HeaderTypeEnum';
import Menu from '../components/Menu';
import RegistrationForm from '../components/RegistrationForm';
import { ICreditCard } from '../interfaces/RegistrationFormType';
import '../styles/Container.css';

const userLoggedIn = {
  userName : "sinu.sudhakaran",
  password: "1234"
}

const card: ICreditCard = {
  cardNumber: 0,
  cvc:0,
  expiry: new Date(),
  name: "",
};

function Container(props: ContainerProps) {
  const [containerType, setContainerType] = useState(props.containerType);
  
  console.log('Conatiner containerType ', containerType);

  const onHeaderClick = (type: number):void => {
    console.log('onHeaderClick in Container with type ', type);
    setContainerType(type);
  }
  return (
    <div className="Container">
        {containerType === HeaderTypeEnum.MENU
          ? <Menu 
              onHeaderClick={() => onHeaderClick(HeaderTypeEnum.MENU)}/>
          : <RegistrationForm 
              userLoggedIn={userLoggedIn} 
              card={card} 
              onHeaderClick={() => onHeaderClick(HeaderTypeEnum.REGISTRATION)}/>
        }
    </div>
  );
}

export default Container;
