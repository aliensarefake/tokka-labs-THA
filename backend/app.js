const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();
app.use(express.json());
mongoose.connect(config.get('MONGO_URI'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .catch((err) => console.error('MongoDB connection error:', err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
