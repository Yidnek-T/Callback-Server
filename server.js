const express = require('express');
const cors = require('cors');
const { createOrder, directPayout } = require('./addispay');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Error handler
const handleApiError = (res, error) => {
  console.error('API Error:', error.message);
  let status = 500;
  let message = error.message;

  try {
    const errorData = JSON.parse(error.message);
    if (errorData.status_code) {
      status = errorData.status_code;
      message = errorData.message || 'Payment processing error';
    }
  } catch (e) {}

  res.status(status).json({
    success: false,
    error: message.includes('311')
      ? 'Temporary service issue. Please try again later.'
      : message,
  });
};

// Checkout Endpoint
app.post('/api/create-order', async (req, res) => {
  try {
    const timestamp = Date.now();
    const uuid = `tx-${timestamp}`;

    const payload = {
      data: {
        phone_number: req.body.phone_number,
        total_amount: parseFloat(req.body.amount).toFixed(2),
        order_reason: req.body.reason || 'Payment',
        nonce: `nonce-${timestamp}`,
        tx_ref: uuid,
        currency: 'ETB',
        email: req.body.email || 'customer@example.com',
        redirect_url: `${req.headers.origin}/success?uuid=${uuid}`,
        cancel_url: `${req.headers.origin}/cancel?uuid=${uuid}`,
        session_expired: '3600',
        order_detail: {
          amount: parseFloat(req.body.amount).toFixed(2),
          description: req.body.reason || 'Payment',
        },
      },
      message: req.body.message || 'Payment request',
    };

    console.log('Creating order:', JSON.stringify(payload, null, 2));

    const result = await createOrder(payload);

    if (!result.checkout_url) {
      throw new Error(result.message || 'No checkout URL received');
    }

    res.json({
      success: true,
      checkout_url: `${result.checkout_url}/${result.uuid || uuid}`, ///${result.uuid || uuid}
      uuid: result.uuid || uuid,
    });
  } catch (error) {
    handleApiError(res, error);
  }
});

// Withdrawal Endpoint
app.post('/api/withdraw', async (req, res) => {
  try {
    const timestamp = Date.now();

    let phone = req.body.phone_number;
    if (req.body.payment_method === 'telebirr') {
      phone = phone.startsWith('251') ? phone : `251${phone.replace(/^0/, '')}`;
    }

    const payload = {
      data: {
        payment_method: req.body.payment_method,
        phone_number:
          req.body.payment_method === 'telebirr' ? phone : undefined,
        bank_code:
          req.body.payment_method === 'bank' ? req.body.bank_code : undefined,
        account_number:
          req.body.payment_method === 'bank'
            ? req.body.account_number
            : undefined,
        total_amount: parseFloat(req.body.amount).toFixed(2),
        currency: 'ETB',
        order_reason: req.body.reason || 'Withdrawal',
        customer_name: req.body.customer_name || 'Customer',
        nonce: `payout-${timestamp}`,
        tx_ref: `payout-${timestamp}`,
        cancel_url: `${req.headers.origin}/cancel`,
        success_url: `${req.headers.origin}/success`,
        error_url: `${req.headers.origin}/error`,
      },
      message: 'This is a test direct payout',
    };

    console.log(
      'Sending payout request to AddisPay:',
      JSON.stringify(payload, null, 2)
    );

    const result = await directPayout(payload);

    if (![200, 900, 913].includes(result.status_code)) {
      throw new Error(JSON.stringify(result));
    }

    res.json({
      success: true,
      data: {
        transaction_id: result.data?.transaction_id,
        reference: payload.data.tx_ref,
      },
    });
  } catch (error) {
    handleApiError(res, error);
  }
});

// Success & Cancel Redirect Routes
app.get('/success', (req, res) => {
  res.redirect('/');
});

app.get('/cancel', (req, res) => {
  res.redirect('/');
});

app.get('/error', (req, res) => {
  res.sendFile(__dirname + '/public/error.html');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
