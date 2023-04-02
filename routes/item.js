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

router.route('/').get(getItems).post(postItem).delete(deleteItems);

router.route('/:itemId').get(getItem).put(putItem).delete(deleteItem);

router.route('/:itemId/ratings').get(getItemRatings).post(postItemRating).delete(deleteItemRatings);

router.route('/:itemId/ratings/:ratingId').get(getItemRating).put(updateItemRating).delete(deleteItemRating);

router.route('/:itemId/image').post(postItemImage);

module.exports = router;
