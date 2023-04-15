const express = require('express');
const router = express.Router();
const {
    getItems,
    postItem,
    deleteItems,
    getItem,
    putItem,
    deleteItem,
    getItemRatings,
    postItemRating,
    deleteItemRatings,
    getItemRating,
    updateItemRating,
    deleteItemRating,
    postItemImage,
} = require('../controllers/itemController');
const protectedRoute = require('../middlewares/auth');

router.route('/').get(getItems).post(postItem).delete(deleteItems);

router
    .route('/:itemId')
    .get(getItem)
    .put(protectedRoute, putItem)
    .delete(protectedRoute, deleteItem);

router
    .route('/:itemId/ratings')
    .get(getItemRatings)
    .post(protectedRoute, postItemRating)
    .delete(protectedRoute, deleteItemRatings);

router
    .route('/:itemId/ratings/:ratingId')
    .get(getItemRating)
    .put(protectedRoute, updateItemRating)
    .delete(protectedRoute, deleteItemRating);

router.route('/:itemId/image').post(protectedRoute, postItemImage);

module.exports = router;
