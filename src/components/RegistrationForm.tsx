import React from 'react';
import moment from 'moment';
import Header from './Header';
import {HeaderTypeEnum} from '../enum/HeaderTypeEnum';
import {IRegistrationProps, IRegistrationState, ICreditCard} from '../interfaces/RegistrationFormType';
import {FormUpdateFieldEnum} from '../enum/FormUpdateFieldEnum';
import RegistrationFormField from './RegistrationFormField';
import '../styles/Registration.css';
import CardService from '../service/CardService';
import {RegisterFormTitle} from '../common/constants';
import DatePicker from 'react-date-picker'

class RegistrationForm extends React.Component<IRegistrationProps, IRegistrationState> {
    constructor(props: IRegistrationProps){
        super(props);
        this.state = {
            error: "",
            card: {
                cardNumber: this.props.card.cardNumber,
                cvc: this.props.card.cvc,
                expiry: this.props.card.expiry,
                name: this.props.card.name
            },
            submitStatus: false,
            formDisabled: false,
        }
    }

    isInputValid = (card: ICreditCard):boolean => {
        if(card) {
            if (!isNaN(card.cardNumber) && 
                !isNaN(card.cvc) &&
                moment(card.expiry, 'D/M/YYYY',true).isValid() &&
                card.cardNumber > 0 && 
                card.cvc > 0 &&
                card.name.trim().length > 0)
                return true;

            this.setState({ error: "Invalid card details entered"});
            return false;
        }
        return false;
    }

    serviceCallback = (status: string, data:any) => {
        console.log('Response from server ', data);
        (status === "")
        ? this.setState({ error: data})
        : this.setState({ error: ""});
        this.setState({formDisabled: false});
    }

    onSubmitForm = (e: React.SyntheticEvent):void => {
        e.preventDefault();
        if (this.isInputValid(this.state.card)){
            const service = new CardService(this.props.userLoggedIn);
            this.setState({formDisabled: true});
            service.postRegistration("/card", this.state.card, this.serviceCallback);
        }
    }

    onFieldChange = (field: FormUpdateFieldEnum, value: any):void => {
        const newCard: ICreditCard = {
            cardNumber: this.state.card.cardNumber,
            cvc: this.state.card.cvc,
            expiry: this.state.card.expiry,
            name: this.state.card.name,
        }

        switch (field){
            case FormUpdateFieldEnum.CREDITCARDNUMBER: newCard.cardNumber = value;break;
            case FormUpdateFieldEnum.CVC: newCard.cvc = value;break;
            case FormUpdateFieldEnum.EXPIRY: newCard.expiry = value;break; 
            case FormUpdateFieldEnum.NAME: newCard.name = value;break; 
        }
        this.setState({ card: newCard });
    }
    
    onChangeDateCallback = (value:any) => {
        this.onFieldChange(FormUpdateFieldEnum.EXPIRY, value);
    }

    public render(){
        return (
            <div className="Registration-form">
              <Header type={HeaderTypeEnum.REGISTRATION} title={RegisterFormTitle} onHeaderClick={this.props.onHeaderClick}/>
              <form  onSubmit={(e) => this.onSubmitForm(e)}>
                <table className="Registration-table">
                <thead>
                    <tr>
                        <th>Welcome {this.props.userLoggedIn.userName}</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                <RegistrationFormField 
                    label="Credit Card Number" 
                    fieldName="cardNumber"
                    fieldType={FormUpdateFieldEnum.CREDITCARDNUMBER}
                    value={this.state.card.cardNumber} 
                    onChange={this.onFieldChange} />

                <RegistrationFormField 
                    label="CVC" 
                    fieldName="cvc"
                    fieldType={FormUpdateFieldEnum.CVC}
                    value={this.state.card.cvc} 
                    onChange={this.onFieldChange} />
                
                <tr>
                    <td>Expiry in dd/mm/yyyy</td>
                    <td>
                        <DatePicker 
                            value={this.state.card.expiry} 
                            format="dd/MM/y"
                            onChange={(value) => this.onChangeDateCallback(value)}
                        />
                    </td>
                </tr>
                <RegistrationFormField 
                    label="Name in the card" 
                    fieldName="name"
                    fieldType={FormUpdateFieldEnum.NAME}
                    value={this.state.card.name}
                    onChange={this.onFieldChange} />
                <tr>
                    <td><label className="RegistrationError">{this.state.error}</label></td>
                    <td />
                </tr>
                <tr>
                    <td>
                    <button 
                    type="submit" 
                    value="submit"
                    className="btn btn-primary"
                    disabled={this.state.formDisabled}
                    >
                        Submit Card Registration
                    </button>
                    </td>
                    <td />
                </tr>
                </tbody>
                </table>
              </form>
            </div>
          );
    }
}

export default RegistrationForm;
