import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    connectedCallback() {
         fetch('http://localhost:3001/api/authenticate',
         {
             // Request type
             method:"GET",
             headers:{
                 //"mode": "no-cors",
                 "Access-Control-Allow-Origin": '*',
                 "Accept": "application/json"
             }
             }).then(response => response.json())
             .then(data => {
                 if (data.redirectUrl) {
                     window.location.href = data.redirectUrl;
                 }
             })
             .catch(error => {
                 console.error('Error authenticating with Salesforce:', error);
             });
             }
        }



