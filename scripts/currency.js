// Fetch available currencies from FloatRates API
fetch('http://www.floatrates.com/daily/usd.json')
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data);
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    currencies.forEach(currency => {
      const option = document.createElement('option');
      option.value = currency;
      option.text = currency;
      fromCurrencySelect.add(option.cloneNode(true));
      toCurrencySelect.add(option);
    });

    
  })
  .catch(error => console.error('Error fetching currencies:', error));

  function convertCurrency() {
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;
  
    fetch(`http://www.floatrates.com/daily/${fromCurrency}.json`)
      .then(response => response.json())
      .then(data => {
        const exchangeRate = data[toCurrency].rate;
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        const timestamp = new Date().toLocaleString();
  
        const resultText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}<br>
                           From Currency: ${fromCurrency}<br>
                           To Currency: ${toCurrency}<br>
                           Calculation Timestamp: ${timestamp}`;
  
        document.getElementById('result').innerHTML = resultText;
      })
      .catch(error => console.error('Error converting currency:', error));
  }
  
