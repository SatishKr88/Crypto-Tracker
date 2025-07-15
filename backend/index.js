const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const coinsRoute = require('./routes/coins');
const historyRoute = require('./routes/history');
const saveSnapshot = require('./utils/saveSnapshot');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.use('/api/coins', coinsRoute);
app.use('/api/history', historyRoute);


cron.schedule('*/30 * * * *', saveSnapshot);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));