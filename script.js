const apiKey = '0e478955c65f474b921b246cd95f1db9';  // Updated API key for Alpha Vantage
const addStockBtn = document.getElementById('add-stock-btn');
const stockSymbolInput = document.getElementById('stock-symbol');
const entryPriceInput = document.getElementById('entry-price');
const stocksList = document.getElementById('stocks');

let stocks = [];

addStockBtn.addEventListener('click', async () => {
    const symbol = stockSymbolInput.value.trim().toUpperCase();
    const entryPrice = parseFloat(entryPriceInput.value);

    if (symbol && entryPrice) {
        // For Indian stocks, check if the symbol contains ".BO" or ".NS" suffix
        if (isIndianStock(symbol) && !symbol.includes('.BO') && !symbol.includes('.NS')) {
            alert('For Indian stocks, please add ".BO" or ".NS" at the end of the stock symbol (e.g., RELIANCE.BO or INFY.NS).');
            return;
        }

        console.log('Fetching data for:', symbol); // Debugging step

        const stockData = await getStockData(symbol);
        if (stockData) {
            const stock = {
                symbol,
                entryPrice,
                currentPrice: stockData.price,
                profitLoss: calculateProfitLoss(entryPrice, stockData.price)
            };
            stocks.push(stock);
            updateStockList();
        }
    } else {
        alert('Please provide both stock symbol and entry price.');
    }

    stockSymbolInput.value = '';
    entryPriceInput.value = '';
});

// Function to check if the stock is an Indian stock
function isIndianStock(symbol) {
    return symbol.endsWith('.BO') || symbol.endsWith('.NS');
}

// Function to fetch stock data from Alpha Vantage
async function getStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('API Response:', data); // Log the response for debugging
        
        if (data["Time Series (5min)"]) {
            const latestTime = Object.keys(data["Time Series (5min)"])[0];
            const latestData = data["Time Series (5min)"][latestTime];
            return { price: parseFloat(latestData["4. close"]) };
        } else {
            console.error('No stock data found for symbol:', symbol);
            alert('Stock symbol not found. Please try again.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching stock data:', error);
        alert('Error fetching stock data. Please check the API or your internet connection.');
        return null;
    }
}

// Function to calculate profit or loss
function calculateProfitLoss(entryPrice, currentPrice) {
    const profitLoss = (currentPrice - entryPrice) * 100;  // Example calculation for 100 shares
    return profitLoss.toFixed(2);
}

// Function to update the stock list UI
function updateStockList() {
    stocksList.innerHTML = '';
    stocks.forEach(stock => {
        const li = document.createElement('li');
        li.classList.add('stock-item');
        li.innerHTML = `
            <span>${stock.symbol}</span>
            <span>Entry Price: $${stock.entryPrice}</span>
            <span>Current Price: $${stock.currentPrice}</span>
            <span>Profit/Loss: $${stock.profitLoss}</span>
        `;
        stocksList.appendChild(li);
    });
}
