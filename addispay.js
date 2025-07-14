// import fetch from 'node-fetch';

// // Base URL and API key
// const baseUrl = 'https://uat.api.addispay.et/checkout-api/v1'; // UAT URL
// const apiKey = 'f7bb0b2f-8c88-4b76-ad6c-e4729ecf9861';

// // 1. Create order
// export const createOrder = async (paymentData) => {
//   const url = baseUrl + '/create-order';
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Auth: apiKey,
//     },
//     body: JSON.stringify(paymentData),
//   };

//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error('Order creation failed: ' + errorText);
//     }
//     const data = await response.json();
//     console.log('Order created successfully:', data);
//     return data; // contains uuid, checkout_url, etc
//   } catch (error) {
//     console.error('Error creating order:', error.message);
//     throw error;
//   }
// };

// // 2. Check order status by UUID
// export const checkOrder = async (uuid) => {
//   const url = `${baseUrl}/get-order?uuid=${uuid}`;

//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         Auth: apiKey, //  API key
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to fetch order for uuid: ${uuid} ${errorText}`);
//     }

//     const data = await response.json();
//     return { data, uuid };
//   } catch (error) {
//     console.error('Error checking order:', error.message);
//     throw error;
//   }
// };

// // 3. Initiate payment
// export const handlePayment = async (paymentPayload) => {
//   const url = baseUrl + '/payment/initiate-payment';
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Auth: apiKey,
//     },
//     body: JSON.stringify(paymentPayload),
//   };

//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         'Payment initiation failed: ' + JSON.stringify(errorData)
//       );
//     }
//     const data = await response.json();
//     console.log('Payment initiated successfully:', data);
//     return data;
//   } catch (error) {
//     console.error('Error initiating payment:', error.message);
//     throw error;
//   }
// };

// //get status   by uuid
// export const checkStatus = async (uuid) => {
//   const url = baseUrl + '/get-status?uuid=' + uuid;
//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         Auth: apiKey,
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         'Failed to fetch order status for uuid: ' + uuid + ' ' + errorText
//       );
//     }

//     const data = await response.json();
//     return { data, uuid };
//   } catch (error) {
//     console.error('Error checking order status:', error.message);
//     throw error;
//   }
// };

// // 4. B2C Direct Payout
// export const directPayout = async (payoutPaymentData) => {
//   const url = baseUrl + '/payment/direct-b2c';
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Auth: apiKey,
//     },
//     body: JSON.stringify(payoutPaymentData),
//   };

//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error('B2C payout failed: ' + errorText);
//     }
//     const data = await response.json();
//     console.log('Payout initiated:', data);
//     return data;
//   } catch (error) {
//     console.error('Error in B2C payout:', error.message);
//     throw error;
//   }
// };

// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));

// const baseUrl = 'https://uat.api.addispay.et/checkout-api/v1';
// const apiKey = 'b59fc5b5-007a-49c0-83e8-5d8e0503db56';

// // 1. Create order
// export async function createOrder(paymentData) {
//   const url = baseUrl + '/create-order';
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Auth: apiKey,
//     },
//     body: JSON.stringify(paymentData),
//   };

//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error('Order creation failed: ' + errorText);
//     }
//     const data = await response.json();
//     console.log('Order created successfully:', data);
//     return data; // contains uuid, checkout_url, etc
//   } catch (error) {
//     console.error('Error creating order:', error.message);
//     throw error;
//   }
// }

// // 2. Check order
// export async function checkOrder(uuid) {
//   const url = `${baseUrl}/get-order?uuid=${uuid}`;

//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         Auth: apiKey, //  API key
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to fetch order for uuid: ${uuid} ${errorText}`);
//     }

//     const data = await response.json();
//     return { data, uuid };
//   } catch (error) {
//     console.error('Error checking order:', error.message);
//     throw error;
//   }
// }

// // 3. Initiate payment
// export async function handlePayment(paymentPayload) {
//   const url = baseUrl + '/payment/initiate-payment';
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Auth: apiKey,
//     },
//     body: JSON.stringify(paymentPayload),
//   };

//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(
//         'Payment initiation failed: ' + JSON.stringify(errorData)
//       );
//     }
//     const data = await response.json();
//     console.log('Payment initiated successfully:', data);
//     return data;
//   } catch (error) {
//     console.error('Error initiating payment:', error.message);
//     throw error;
//   }
// }

// // 4. Check status
// export async function checkStatus(uuid) {
//   const url = baseUrl + '/get-status?uuid=' + uuid;
//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         Auth: apiKey,
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         'Failed to fetch order status for uuid: ' + uuid + ' ' + errorText
//       );
//     }

//     const data = await response.json();
//     return { data, uuid };
//   } catch (error) {
//     console.error('Error checking order status:', error.message);
//     throw error;
//   }
// }

// // ➕ 5. Add refund (based on test_uat.js)
// export async function refundOrder(refundData) {
//   const url = baseUrl + '/payment/direct-b2c';
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Auth: apiKey,
//     },
//     body: JSON.stringify(refundData),
//   };

//   const res = await fetch(url, options);
//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error('Refund failed: ' + text);
//   }
//   const data = await res.json();
//   console.log('Refund successful:', data);
//   return data;
// }

// addispay.js

// For User Acceptance  Testing

// // addispay.js
import fetch from 'node-fetch';

const baseUrl = 'https://uat.api.addispay.et/checkout-api/v1';
const apiKey = 'd686e83b-9504-4ac9-bf33-453c3c21f8e0';

// 1. Create order
export const createOrder = async (paymentData) => {
  const url = `${baseUrl}/create-order`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Auth: apiKey,
    },
    body: JSON.stringify(paymentData),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    console.log('Order created:', data);
    return data;
  } catch (error) {
    console.error(' Error creating order:', error.message);
    throw error;
  }
};

// 2. Check order by UUID
export const checkOrder = async (uuid) => {
  const url = `${baseUrl}/get-order?uuid=${uuid}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Auth: apiKey,
      },
    });

    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    console.log(` Order retrieved [UUID: ${uuid}]:`, data);
    return { data, uuid };
  } catch (error) {
    console.error(' Error checking order:', error.message);
    throw error;
  }
};

// 3. Initiate payment
export const handlePayment = async (paymentPayload) => {
  const url = `${baseUrl}/payment/initiate-payment`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Auth: apiKey,
    },
    body: JSON.stringify(paymentPayload),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    console.log('Payment initiated:', data);
    return data;
  } catch (error) {
    console.error(' Error initiating payment:', error.message);
    throw error;
  }
};

// 4. Check payment status
export const checkStatus = async (uuid) => {
  const url = `${baseUrl}/get-status?uuid=${uuid}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Auth: apiKey,
      },
    });

    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    console.log(` Payment status for UUID ${uuid}:`, data);
    return { data, uuid };
  } catch (error) {
    console.error(' Error checking payment status:', error.message);
    throw error;
  }
};

// 5. B2C Direct Payout
export const directPayout = async (payoutData) => {
  console.log(
    'Sending payout request to AddisPay:',
    JSON.stringify(payoutData, null, 2)
  );

  const url = `${baseUrl}/payment/direct-b2c`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Auth: apiKey,
    },
    body: JSON.stringify(payoutData),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    console.log(' Payout processed:', data);
    return data;
  } catch (error) {
    console.error(' Error processing payout:', error.message);
    throw error;
  }
};

// For  Production

// addispay.js
// const fetch = require('node-fetch');

// const baseUrl = 'https://api.addispay.et/checkout-api/v1';
// const apiKey = '0f7f3687-ce5a-41aa-98a1-b6ec5bdd8bee'; // Replace with your actual key

// const createOrder = async (paymentData) => {
//   const url = `${baseUrl}/create-order`;
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Auth: apiKey,
//     },
//     body: JSON.stringify(paymentData),
//   };

//   const response = await fetch(url, options);
//   if (!response.ok) throw new Error(await response.text());
//   return await response.json();
// };

// const directPayout = async (payoutData) => {
//   const url = `${baseUrl}/payment/direct-b2c`;
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Auth: apiKey,
//     },
//     body: JSON.stringify(payoutData),
//   };

//   const response = await fetch(url, options);
//   if (!response.ok) throw new Error(await response.text());
//   return await response.json();
// };

// module.exports = {
//   createOrder,
//   directPayout,
// };
