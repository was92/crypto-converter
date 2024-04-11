// Get references to the elements
const fromAmount = document.querySelector('.amount-from')
const fromCurrency = document.querySelector('.currency-from')
const toCurrency = document.querySelector('.currency-to')
const toAmount = document.querySelector('.amount-to')
const resetButton = document.querySelector('.btn-reset')
const convertButton = document.querySelector('.btn-convert')

// Reset functionality
resetButton.addEventListener('click', function() {
  fromAmount.value = '' // Clear out user input
  toAmount.value = '' // Clear out converted value
  fromCurrency.value = 'usd' // Reset "from currency" to USD
  toCurrency.value = 'bitcoin' // Reset "to currency" to BTC
})

// Convert functionality
convertButton.addEventListener('click', async function() {
  const fromValue = parseFloat(fromAmount.value)
  if (isNaN(fromValue)) {
    alert('Please enter a valid amount.')
    return
  }

  // Do conversion here
  let convertedValue = await convertCurrency(fromValue, fromCurrency.value, toCurrency.value)

  // Adjust precision for very small amounts
  if (convertedValue < 0.01) {
    toAmount.value = convertedValue.toFixed(8) // Display up to 8 decimal places for very small amounts
  } else {
    toAmount.value = convertedValue.toFixed(2) // Otherwise, display with 2 decimal places
  }
})


async function convertCurrency(fromValue, fromCurrency, toCurrency) {
  // Don't convert if it's the same currency
  if(fromCurrency === toCurrency) {
    return 1
  }

  // Fetch the rates here
  const fromRate = await fetchRate(fromCurrency)
  const toRate = await fetchRate(toCurrency)

  // Calculate & return the conversion
  return (fromValue * fromRate) / toRate
}

// Fetch the conversion rate from the coingecko API
// Sample URl: https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd
async function fetchRate(currency) {
  // Build the API url
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${currency}&vs_currencies=usd`

  // Call the API
  const response = await fetch(url)

  // Get the data from the response
  const data = await response.json()

  // Get the rate from the nested JSON data (and return it)
  return data[currency]['usd']
}

// Use this function in place of the API call
function getRate(currency) {
  const rates = {
    'usd': 1,
    'bitcoin': 33835.54,
    'ethereum': 1777.96,
    'ripple': 0.550752,
    'binancecoin': 220.98,
    'solana': 31.01,
    'dogecoin': 0.070760,
    'matic-network': 0.624791,
    'chainlink': 10.49,
    'tron': 0.092186
  }

  return rates[currency]
}
