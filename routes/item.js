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
    deleteItemRatings
} = require('../controllers/itemController');

router.route('/').get(getItems).post(postItem).delete(deleteItems);

router.route('/:itemId').get(getItem).put(putItem).delete(deleteItem);

router.route('/:itemId/ratings').get(getItemRatings).post(postItemRating).delete(deleteItemRatings);

module.exports = router;
