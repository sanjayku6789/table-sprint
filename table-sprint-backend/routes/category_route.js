const express = require('express');
const multer = require("multer");
const { getAllCategory, createCategory, editCategory, deleteCategory } = require('../controller/category');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const { verifyToken } = require('../middleware/middleware');



router.get('/all',verifyToken, getAllCategory);
router.post('/add', verifyToken, upload.single("category_image"), createCategory);
router.put('/edit/:id', verifyToken, upload.single("category_image"), editCategory);
router.delete('/delete/:id',verifyToken, deleteCategory);

module.exports = router;
