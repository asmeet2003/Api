document.addEventListener('DOMContentLoaded', async () => {
    // Event listeners for buttons
    document.getElementById('inr-btn').addEventListener('click', () => {
        console.log('INR button clicked');
        // Add functionality here
    });

    document.getElementById('btc-btn').addEventListener('click', () => {
        console.log('BTC button clicked');
        // Add functionality here
    });

    document.getElementById('buy-btc-btn').addEventListener('click', () => {
        console.log('BUY BTC button clicked');
        // Add functionality here
    });

    // Fetching data and updating the UI
    try {
        const response = await fetch('/api/tickers');
        const data = await response.json();

        const table = document.getElementById('ticker-table');
        data.forEach((ticker, index) => {
            const row = document.createElement('tr');
            const difference = ((ticker.sell - ticker.buy) / ticker.buy * 100).toFixed(2);
            const savings = (ticker.sell - ticker.buy).toFixed(2);

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${ticker.name}</td>
                <td>₹${ticker.last}</td>
                <td>₹${ticker.buy} / ₹${ticker.sell}</td>
                <td>${difference}%</td>
                <td>₹${savings}</td>
            `;
            table.appendChild(row);
        });

        const bestPrice = data.reduce((acc, ticker) => acc + parseFloat(ticker.last), 0) / data.length;
        document.querySelector('.price').innerHTML = `₹ ${bestPrice.toFixed(2)}<br><span>Best Price to Trade</span>`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
