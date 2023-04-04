import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    connectedCallback() {
         fetch('/oauth2/auth',
         {
             // Request type
             method:"GET",
             headers:{
                 "mode": "no-cors",
                 "Access-Control-Allow-Origin": '*',
                 "Accept": "application/json"
             }
             }).then(response => {
                console.log(response);
                
            });
        }


}
