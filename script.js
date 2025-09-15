// getParam function using regex (user-provided version)
function getParam(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const url = window.location.href;
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results || !results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Calculate monthly repayment (7% annual example)
function calculate() {
  const amount = parseFloat(document.getElementById('loanAmount').value);
  const term = parseInt(document.getElementById('loanTerm').value);
  if (!amount || !term) {
    document.getElementById('result').innerText = 'Please enter valid values.';
    return;
  }
  const rate = 0.07 / 12; // 7% annual interest, monthly
  const monthly = (amount * rate) / (1 - Math.pow(1 + rate, -term));
  document.getElementById('result').innerText = `Estimated Monthly Payment: $${monthly.toFixed(2)}`;
}

// onload autofill using regex getParam (merged with initialization)
window.onload = () => {
  try {
    const nameField = document.querySelector('input[name="name"]');
    const emailField = document.querySelector('input[name="email"]');
    const phoneField = document.querySelector('input[name="phone"]');
    const amountField = document.querySelector('input[name="amount"]');
    const vehicleSelect = document.querySelector('select[name="vehicle"]');
    const loanAmountInput = document.getElementById('loanAmount');
    const loanTermInput = document.getElementById('loanTerm');

    if (nameField) nameField.value = getParam('name');
    if (emailField) emailField.value = getParam('email');
    if (phoneField) phoneField.value = getParam('phone');
    if (amountField) amountField.value = getParam('amount');
    if (vehicleSelect && getParam('vehicle')) vehicleSelect.value = getParam('vehicle');

    // Also populate calculator fields if provided in URL
    if (loanAmountInput) loanAmountInput.value = getParam('amount');
    if (loanTermInput) loanTermInput.value = getParam('term');

    // Attach calculator button handler
    const calcBtn = document.getElementById('calcBtn');
    if (calcBtn) calcBtn.addEventListener('click', function(e){ e.preventDefault(); calculate(); });

  } catch (err) {
    console.error('Initialization error', err);
  }
};
