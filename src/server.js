require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const productsRouter = require('./routers/products');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const app = express();
app.use(express.json());

app.use('/products', productsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Database connection error:', err));
