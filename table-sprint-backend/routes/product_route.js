const express = require('express');
const multer = require("multer");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require('../controller/product');
const product_router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const { verifyToken } = require('../middleware/middleware');



product_router.get('/all',verifyToken, getAllProducts);
product_router.post('/create', verifyToken, upload.single("product_image"), createProduct);
product_router.put('/update/:id', verifyToken, upload.single("product_image"), updateProduct);
product_router.delete('/delete/:id',verifyToken, deleteProduct);

module.exports = product_router;
