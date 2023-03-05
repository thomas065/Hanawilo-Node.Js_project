const express = require('express');
const router = express.Router();
const { getCategories, createCategory, putCategory, deleteCategories } = require('../controllers/categoryController');

// resource to create a category
router
    .route('/')
    .get(getCategories)
    .post(createCategory)
    .put(putCategory)
    .delete(deleteCategories);

module.exports = router;
