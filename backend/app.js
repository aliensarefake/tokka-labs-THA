const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const liveTransactionService = require('./services/liveTransactionService.js');

const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');


const app = express();
app.use(cors());
app.use(express.json());

const openapiDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

// Routes
app.use('/batch', require('./routes/batch.js'));
app.use('/transactions', require('./routes/transaction.js'));
app.use('/statistics', require('./routes/statistics.js')); 

mongoose.connect(config.get('MONGO_URI'))
  .then(() => {
    console.log('MongoDB connected');
    liveTransactionService.startLiveTransactionListener(); 
  })
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 4100;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
