const axios = require('axios');
const History = require('../models/history');

const saveSnapshot = async () => {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';
    const { data } = await axios.get(url);
    const snapshot = new History({ prices: data });
    await snapshot.save();
    console.log('[Snapshot saved] at', new Date().toLocaleString());
  } catch (err) {
    console.error('[Snapshot error]', err);
  }
};

module.exports = saveSnapshot;