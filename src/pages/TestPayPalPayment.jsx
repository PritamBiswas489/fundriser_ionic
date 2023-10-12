
  import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';


const TestPayPalPayment = () => {
    const PayPalConfig = {
        clientId: 'ASGmx0voYurcLB-H7Ro28xBrDpitEXe37v8qhQmKFU0Aqho-CnTSwAJoifghDRgH_X8g1AyZ35NxaICo',
        currency: 'USD', // Change to your preferred currency
      };
  return (
    <PayPalScriptProvider options={PayPalConfig}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
                {
                  amount: {
                    value: '500.00', // Replace with your total amount
                  }, 
                },
              ],
          });
        }}
        onApprove={(data, actions) => {
            return actions.order.capture().then(function (details) {
                alert('Transaction completed by ' + details.payer.name.given_name);
                console.log(details);
                
            });
        }}
        onError={(error) => {
            // Handle the error here, e.g., show an error message to the user
            console.error('PayPal Error:', error);
        }} // Handle payment errors here
      />
    </PayPalScriptProvider>
  );
};

export default TestPayPalPayment;

