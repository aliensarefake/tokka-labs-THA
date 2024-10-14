const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const liveTransactionService = require('./services/liveTransactionService.js');

const app = express();
app.use(express.json());

// Routes
app.use('/batch', require('./routes/batch.js'));
app.use('/transactions', require('./routes/transaction.js'));

mongoose.connect(config.get('MONGO_URI'))
  .then(() => {
    console.log('MongoDB connected');
    liveTransactionService.startLiveTransactionListener(); 
  })
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
