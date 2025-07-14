// Tab switching
const tabs = document.querySelectorAll('.tab');
const checkoutForm = document.getElementById('checkout-form');
const withdrawForm = document.getElementById('withdraw-form');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    const tabName = tab.dataset.tab;

    checkoutForm.classList.toggle('hidden', tabName !== 'checkout');
    withdrawForm.classList.toggle('hidden', tabName !== 'withdraw');
  });
});

// Toggle withdrawal fields
const paymentMethodSelect = document.getElementById('payment-method');
const telebirrFields = document.getElementById('telebirr-fields');
const bankFields = document.getElementById('bank-fields');

paymentMethodSelect.addEventListener('change', () => {
  const method = paymentMethodSelect.value;
  telebirrFields.classList.toggle('hidden', method !== 'telebirr');
  bankFields.classList.toggle('hidden', method !== 'bank');
});

// Payment
document.getElementById('checkout-btn').addEventListener('click', async () => {
  const phoneInput = document.getElementById('phone');
  const amountInput = document.getElementById('amount');
  const reasonInput = document.getElementById('reason');
  const statusDiv = document.getElementById('checkout-status');
  const btn = document.getElementById('checkout-btn');

  const phone = phoneInput.value.trim();
  const amount = amountInput.value.trim();
  const reason = reasonInput.value.trim();

  statusDiv.textContent = '';
  statusDiv.className = 'status';

  // Validate phone: Ethiopian numbers start with 251 or 0 then 9 or 7, and 8 digits after
  if (!phone.match(/^(251|0)[79]\d{8}$/)) {
    statusDiv.textContent = 'Invalid Ethiopian phone number format';
    statusDiv.className = 'status error';
    return;
  }
  if (!amount || !reason) {
    statusDiv.textContent = 'Please fill all required fields';
    statusDiv.className = 'status error';
    return;
  }

  btn.disabled = true;
  statusDiv.innerHTML = '<div class="spinner"></div> Processing payment...';

  try {
    const formattedPhone = phone.startsWith('0')
      ? '251' + phone.substring(1)
      : phone;

    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone_number: formattedPhone,
        amount,
        reason,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Payment initiation failed');
    }

    if (!result.checkout_url) {
      throw new Error('No checkout URL received');
    }

    window.location.href = result.checkout_url;
  } catch (error) {
    statusDiv.textContent = `Error: ${error.message}`;
    statusDiv.className = 'status error';
    btn.disabled = false;
  }
});

// Withdrawal
document.getElementById('withdraw-btn').addEventListener('click', async () => {
  const method = paymentMethodSelect.value;
  let phone = document.getElementById('withdraw-phone').value.trim();
  const amountInput = document.getElementById('withdraw-amount');
  const reasonInput = document.getElementById('withdraw-reason');
  const bankCodeSelect = document.getElementById('bank-code');
  const accountNumberInput = document.getElementById('account-number');
  const statusDiv = document.getElementById('withdraw-status');
  const btn = document.getElementById('withdraw-btn');

  const amount = amountInput.value.trim();
  const reason = reasonInput.value.trim();

  statusDiv.textContent = '';
  statusDiv.className = 'status';

  if (!amount || !reason) {
    statusDiv.textContent = 'Please fill all required fields';
    statusDiv.className = 'status error';
    return;
  }

  if (method === 'telebirr') {
    if (!phone.match(/^(251|0)[79]\d{8}$/)) {
      statusDiv.textContent = 'Invalid Ethiopian TeleBirr phone number';
      statusDiv.className = 'status error';
      return;
    }
    phone = phone.startsWith('0') ? '251' + phone.substring(1) : phone;
  } else if (method === 'bank') {
    const bankCode = bankCodeSelect.value;
    const accountNumber = accountNumberInput.value.trim();

    if (!bankCode) {
      statusDiv.textContent = 'Please select a bank';
      statusDiv.className = 'status error';
      return;
    }
    if (!accountNumber) {
      statusDiv.textContent = 'Please enter account number';
      statusDiv.className = 'status error';
      return;
    }

    phone = ''; // Not used for bank withdrawal
  }

  btn.disabled = true;
  statusDiv.innerHTML = '<div class="spinner"></div> Processing withdrawal...';

  try {
    const payload = {
      payment_method: method,
      amount,
      reason,
    };

    if (method === 'telebirr') {
      payload.phone_number = phone;
    } else if (method === 'bank') {
      payload.bank_code = bankCodeSelect.value;
      payload.account_number = accountNumberInput.value.trim();
    }

    const response = await fetch('/api/withdraw', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Withdrawal failed');
    }

    statusDiv.textContent = 'Withdrawal successful!';
    statusDiv.className = 'status success';
  } catch (error) {
    statusDiv.textContent = `Error: ${error.message}`;
    statusDiv.className = 'status error';
  } finally {
    btn.disabled = false;
  }
});
