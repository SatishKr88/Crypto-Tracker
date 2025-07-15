const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  prices: [{}],
});

module.exports = mongoose.model('History', HistorySchema);