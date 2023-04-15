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
const protectedRoute = require('../middlewares/auth');
protectedRoute;

// resource to create a category
router
    .route('/')
    .get(getCategories)
    .post(protectedRoute, postCategory)
    .delete(protectedRoute, deleteCategories);

router
    .route('/:categoryId')
    .get(getCategory)
    .put(protectedRoute, putCategory)
    .delete(protectedRoute, deleteCategory);

module.exports = router;
