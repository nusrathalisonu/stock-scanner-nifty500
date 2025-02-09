// Your API key for Alpha Vantage
const apiKey = 'C7PVP7K2IP2ZKGI3';  // Your actual API key

// Fetching stock data
async function getStockData() {
    // Fetch stock data for Nifty 500 with 30-minute intervals
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NIFTY500&interval=30min&apikey=${apiKey}`);
    const data = await response.json();

    console.log(data);  // Log the response to check the data format

    // Check if the data exists and contains the 'Time Series (30min)' object
    if (data['Time Series (30min)']) {
        const timeSeries = data['Time Series (30min)'];

        // Example: Extracting the last 5 entries for demonstration
        const recentData = Object.keys(timeSeries).slice(0, 5).map(time => {
            return {
                time: time,
                close: timeSeries[time]['4. close']
            };
        });

        console.log(recentData); // Log the extracted recent data

        // Displaying top gainers and losers (simulated for simplicity)
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

        // Chart.js - Display a 30-minute stock chart
        const ctx = document.getElementById('stock-chart').getContext('2d');
        
        const chart = new Chart(ctx, {
            type: 'line',  // Line chart type
            data: {
                labels: recentData.map(item => item.time),  // Time labels (using recent data times)
                datasets: [{
                    label: 'Stock Price',
                    data: recentData.map(item => item.close),  // Stock closing prices
                    borderColor: 'rgba(75, 192, 192, 1)',  // Line color
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false  // Don't start Y-axis from 0
                    }
                }
            }
        });
    } else {
        console.error('Data not available or incorrect format', data);
    }
}

// Fetch stock data when the page loads
getStockData();
