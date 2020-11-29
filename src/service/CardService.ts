import axios from 'axios';
import {BASEURL} from '../common/constants';
import { ICreditCard } from '../interfaces/RegistrationFormType';
import IServicePropsType from '../interfaces/ServicePropsType';
import moment from 'moment';

class CardService {
  service: any;
  username: string = "";
  password: string = "";
  
  constructor(props: IServicePropsType){
    let service = axios.create();
  
    this.service = service; 
    this.username = props.userName;
    this.password = props.password;
  }

  postRegistration(path: string, payload: ICreditCard, callback:any) {
    const url: string = BASEURL.concat(path);
    const data: any = {
      CardNumber: payload.cardNumber,
      Cvc: payload.cvc,
      Expiry: moment(payload.expiry).format('D/M/YYYY'),
      Name: payload.name
    };
    console.log('url - payload ', url, data);

    return this.service.request({
      method: "PUT",
      url,
      responseType: "json", 
      data,
      headers:{'Content-Type': 'application/json; charset=utf-8'},
      auth: {
        username: this.username,
        password: this.password
      },
    })
    .then((res: any) => {
      console.log("Data from server ", res);
      callback(res.status, res.data)}
      )
    .catch((error:any) => {
      console.log("API error ", error.message);
      callback("", error.message)
    });
  }
}

export default CardService;
