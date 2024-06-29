const axios = require('axios');
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'hodlinfo',
    password: 'Ashmeet2003',
    port: 5432,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Connection error', err.stack));

const fetchAndStoreData = async () => {
    try {
        console.log('Fetching data from API...');
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = Object.values(response.data).slice(0, 10);

        console.log('Storing data in the database...');
        for (let ticker of tickers) {
            const { name, last, buy, sell, volume, base_unit } = ticker;
            console.log(`Inserting ticker: ${name}`);
            await client.query(
                'INSERT INTO public.tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
                [name, last, buy, sell, volume, base_unit]
            );
        }
        console.log('Data stored successfully');
    } catch (error) {
        console.error('Error fetching or storing data:', error);
    } finally {
        client.end()
            .then(() => console.log('Disconnected from PostgreSQL'))
            .catch(err => console.error('Disconnection error', err.stack));
    }
};

fetchAndStoreData();
