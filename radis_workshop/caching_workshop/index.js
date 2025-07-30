const express = require('express');
const axios = require('axios');
const { createClient } = require('redis');

// Get environment variables from .env file
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = 3000;

// Create a Redis client
const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
client.on('error', err => console.log('Redis Client Error', err));


(async () => {
    // Connect to Redis
    await client.connect();
    // Set cache expiration time (TTL) in seconds
    const CACHE_TTL = 60; // seconds

    // Helper: Get from Redis cache or fetch from API
    async function getStockData(symbol) {
        const cached = await client.get(symbol);
        if (cached) {
            return { data: JSON.parse(cached), cached: true };
        }
        // Replace with a real stock API endpoint and API key if needed
        const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=d1p1p3hr01qi9vk24ms0d1p1p3hr01qi9vk24msg`;
        const response = await axios.get(url);
        // Cache the API response in Redis
        await client.setEx(symbol, CACHE_TTL, JSON.stringify(response.data));
        // Format the response to include the symbol and data
        response.data = {
            symbol: symbol,
            data: response.data
        };
        return { data: response.data, cached: false };
    }

    // API endpoint
    app.get('/stock/:symbol', async (req, res) => {
        try {
            const symbol = req.params.symbol.toUpperCase();
            const result = await getStockData(symbol);
            res.json({
                symbol,
                ...result,
            });
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch stock data' });
        }
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`test with: http://localhost:${PORT}/stock/AAPL`);
    });
})();