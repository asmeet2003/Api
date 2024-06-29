const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todolistdb",
    password: "Ashmeet2003",
    port: "5432",
});

app.use(express.static(path.join(__dirname, 'public')));

async function fetchData() {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const data = Object.values(response.data).slice(0, 10);

        await pool.query('DROP TABLE IF EXISTS tickers');
        await pool.query(`
            CREATE TABLE tickers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                last NUMERIC,
                buy NUMERIC,
                sell NUMERIC,
                volume NUMERIC,
                base_unit VARCHAR(10)
            )
        `);

        const insertQuery = 'INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)';
        data.forEach(async (ticker) => {
            await pool.query(insertQuery, [ticker.name, ticker.last, ticker.buy, ticker.sell, ticker.volume, ticker.base_unit]);
        });

        console.log('Data fetched and stored in database');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

app.get('/api/tickers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tickers');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    fetchData();
});
