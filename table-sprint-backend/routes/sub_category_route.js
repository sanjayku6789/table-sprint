const express = require('express');
const multer = require("multer");
const { getAllSubCategory, createSubCategory, editSubCategory, deleteSubCategory, getSubCategoryByCategory } = require('../controller/sub_category');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
const { verifyToken } = require('../middleware/middleware');



router.get('/all',verifyToken, getAllSubCategory);
router.post('/add', verifyToken, upload.single("sub_category_image"), createSubCategory);
router.put('/edit/:id', verifyToken, upload.single("sub_category_image"), editSubCategory);
router.delete('/delete/:id',verifyToken, deleteSubCategory);
router.get('/bycat/:cat_id',verifyToken, getSubCategoryByCategory);


module.exports = router;
