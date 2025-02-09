const apiKey = 'C7PVP7K2IP2ZKGI3';  // Your API key from Alpha Vantage

// Fetching stock data
async function getStockData() {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NIFTY500&interval=30min&apikey=${apiKey}`);
    const data = await response.json();

    // Simulated data for top gainers and losers (for simplicity)
    const gainers = [
        { name: 'Stock A', change: '+5%' },
        { name: 'Stock B', change: '+4%' },
        { name: 'Stock C', change: '+3%' }
    ];
    const losers = [
        { name: 'Stock D', change: '-5%' },
        { name: 'Stock E', change: '-4%' },
        { name: 'Stock F', change: '-3%' }
    ];

    // Displaying top gainers and losers
    const gainersHTML = gainers.map(stock => `<p>${stock.name}: ${stock.change}</p>`).join('');
    const losersHTML = losers.map(stock => `<p>${stock.name}: ${stock.change}</p>`).join('');

    document.getElementById('stock-info').innerHTML = `
        <h2>Top Gainers</h2>
        ${gainersHTML}
        <h2>Top Losers</h2>
        ${losersHTML}
    `;
}

// Draw 30-Minute Chart
const ctx = document.getElementById('stock-chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['10:00', '10:30', '11:00', '11:30', '12:00'],  // Example time labels
        datasets: [{
            label: 'Stock Price',
            data: [100, 105, 103, 108, 110],  // Sample stock prices
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Fetch stock data when the page loads
getStockData();
