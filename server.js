const express = require('express');
const axios = require('axios');
const path = require('path');
const { insertData, getAllData, clearData } = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Renamed from /api/crypto-data to /api/getTop10 as per instructions
app.get('/api/getTop10', async (req, res) => {
    try {
        console.log('Fetching data from WazirX API');
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;

        const top10 = Object.values(tickers)
            .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
            .slice(0, 10)
            .map(ticker => ({
                name: ticker.name,
                last: parseFloat(ticker.last),
                buy: parseFloat(ticker.buy),
                sell: parseFloat(ticker.sell),
                volume: parseFloat(ticker.volume),
                base_unit: ticker.base_unit
            }));

        clearData((err) => {
            if (err) {
                console.error('Error clearing data', err);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                insertData(top10);
                res.json(top10);
            }
        });
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
});

app.get('/api/stored-data', (req, res) => {
    getAllData((err, data) => {
        if (err) {
            console.error('Error fetching data from database', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(data);
        }
    });
});

// Function to fetch and update data periodically
function updateDataPeriodically() {
    setInterval(async () => {
        try {
            const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
            const tickers = response.data;

            const top10 = Object.values(tickers)
                .sort((a, b) => parseFloat(b.volume) - parseFloat(a.volume))
                .slice(0, 10)
                .map(ticker => ({
                    name: ticker.name,
                    last: parseFloat(ticker.last),
                    buy: parseFloat(ticker.buy),
                    sell: parseFloat(ticker.sell),
                    volume: parseFloat(ticker.volume),
                    base_unit: ticker.base_unit
                }));

            clearData((err) => {
                if (err) {
                    console.error('Error clearing data', err);
                } else {
                    insertData(top10);
                    console.log('Data updated successfully');
                }
            });
        } catch (error) {
            console.error('Error updating data', error);
        }
    }, 300000); // Update every 5 minutes (300000 ms)
}

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    updateDataPeriodically(); // Start periodic updates
});
