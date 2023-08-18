const express = require('express');
const app = express();
const productRoutes = require('./routes/products');
const cors = require('cors');
app.use(cors());
app.use('/products', productRoutes);