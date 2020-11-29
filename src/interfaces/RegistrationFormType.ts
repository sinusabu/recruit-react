export interface ICreditCard {
    cardNumber: number,
    cvc: number,
    expiry: Date,
    name: string,
}

export interface  IRegistrationProps {
    userLoggedIn:{
        userName: string,
        password: string
    },
    card: ICreditCard,
    onHeaderClick: any,
}

export interface IValues {
    [key: string]: any;
  }

export interface IFieldProps {
    label: string,
    fieldName: string,
    fieldType: number,
    value: any,
    onChange: any,
}

export interface IRegistrationState {
    card: ICreditCard,
    error: string,
    submitStatus: boolean,
    formDisabled: boolean,
}
