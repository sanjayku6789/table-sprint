const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth_route');
const productRoutes = require('./routes/product_route');
const categoryRoutes = require('./routes/category_route')
const subCategoryRoutes = require('./routes/sub_category_route')
const cors = require('cors');


const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/category',categoryRoutes);
app.use('/subcategory',subCategoryRoutes)


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
