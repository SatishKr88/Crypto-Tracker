const express = require('express');
const axios = require('axios');
const History = require('../models/history');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';
    const { data } = await axios.get(url);
    const newSnapshot = new History({ prices: data });
    await newSnapshot.save();
    res.status(201).json(newSnapshot);
  } catch (err) {
    res.status(500).json({ error: 'Failed to store history' });
  }
});

router.get('/:coinId', async (req, res) => {
  const { coinId } = req.params;
  try {
    const history = await History.find({}, { prices: 1, timestamp: 1 });
    const filtered = history.map(entry => {
      const coin = entry.prices.find(c => c.id === coinId);
      return coin ? { ...coin, timestamp: entry.timestamp } : null;
    }).filter(Boolean);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coin history' });
  }
});

module.exports = router;