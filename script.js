// Replace with your Alpha Vantage API key
const apiKey = C7PVP7K2IP2ZKGI3;

// Function to fetch stock data
async function getStockData() {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NIFTY500&interval=30min&apikey=${apiKey}`);
    const data = await response.json();
    console.log(data);
}

getStockData();
