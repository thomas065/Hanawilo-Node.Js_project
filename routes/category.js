const express = require('express');
const router = express.Router();
const {
    getCategories,
    postCategory,
    deleteCategories,
    getCategory,
    putCategory,
    deleteCategory,
} = require('../controllers/categoryController');

// resource to create a category
router
    .route('/')
    .get(getCategories)
    .post(postCategory)
    .delete(deleteCategories);

router
    .route('/:categoryId')
    .get(getCategory)
    .put(putCategory)
    .delete(deleteCategory);

module.exports = router;
