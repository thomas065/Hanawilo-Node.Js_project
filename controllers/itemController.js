const Item = require('../models/Item');
const path = require('path');

const getItems = async (req, res, next) => {
    // query parameter

    const filter = {};
    const options = {};

    if (Object.keys(req.query).length) {
        const { gender, price, isClearance, colors, sizes, limit, sortByItem } =
            req.query;

        if (gender) filter.gender = true;
        if (price) filter.price = true;
        if (isClearance) filter.isClearance = true;
        if (colors) filter.colors = true;
        if (sizes) filter.sizes = true;

        if (limit) options.limit = limit;
        if (sortByItem) options.sort = { itemName: sortByItem };
    }
    try {
        const items = await Item.find({}, filter, options);
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ message: `Found list of items`, items });
    } catch (err) {
        next(err);
    }
};

const postItem = async (req, res, next) => {
    try {
        const item = await Item.create(req.body);
        res.status(201)
            .setHeader('Content-Type', 'application/json')
            .json(item);
    } catch (err) {
        next(err);
    }
};

const deleteItems = async (req, res, next) => {
    try {
        const items = await Item.deleteMany();
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(items);
    } catch (err) {
        next(err);
    }
};

// route for ./item/:itemId'

const getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: `Found item with id: ${req.params.itemId}`,
                item,
            });
    } catch (err) {
        next(err);
    }
};

const putItem = async (req, res, next) => {
    try {
        const updateItem = await Item.findByIdAndUpdate(
            req.params.categoryId,
            req.body,
            { new: true }
        );
        res.status(201)
            .setHeader('Content-Type', 'application/json')
            .json({ updateItem });
    } catch (err) {
        next(err);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        const deleteItem = await Item.findByIdAndDelete(req.params.itemId);
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(deleteItem);
    } catch (err) {
        next(err);
    }
};

// for '/:itemId/ratings'

const getItemRatings = async (req, res, next) => {
    try {
        const result = await Item.findById(req.params.itemId);
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result.ratings);
    } catch (err) {
        next(err);
    }
};

const postItemRating = async (req, res, next) => {
    try {
        const result = await Item.findById(req.params.itemId);
        result.ratings.push(req.body);

        // saves new rating to the database
        await result.save();
        res.status(201)
            .setHeader('Content-Type', 'application/json')
            .json(result.ratings);
    } catch (err) {
        next(err);
    }
};

const deleteItemRatings = async (req, res, next) => {
    try {
        const result = await Item.findById(req.params.itemId);
        result.ratings = [];
        await result.save();
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json({
                message: `All ratings for item with id: ${req.params.itemId} have been deleted`,
            });
    } catch (err) {
        next(err);
    }
};

// For /itemId/ratings/:ratingId endpoints

const getItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        let rating = item.ratings.find(rating =>
            rating._id.equals(req.params.ratingId)
        );

        if (!rating)
            rating = {
                message: `Rating with id: ${req.params.ratingId} not found`,
            };

        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating);
    } catch (err) {
        next(err);
    }
};

const updateItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        let rating = item.ratings.find(rating =>
            rating._id.equals(req.params.ratingId)
        );
        1;

        if (!rating) {
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1, req.body);
            rating = req.body;
            await item.save();
        } else {
            rating = {
                message: `Rating with id: ${req.params.ratingId} not found`,
            };
        }
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating);
    } catch (err) {
        next(err);
    }
};

const deleteItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        let rating = item.ratings.find(rating =>
            rating._id.equals(req.params.ratingId)
        );

        if (!rating) {
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1);
            rating = {
                message: `Rating with id: ${req.params.ratingId} has been deleted`,
            };
            await item.save();
        } else {
            rating = {
                message: `Rating with id: ${req.params.ratingId} not found`,
            };
        }
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating);
    } catch (err) {
        next(err);
    }
};

const postItemImage = async (req, res, next) => {
    try {
        const err = { message: `Error uploading image` };
        if (!req.files) next(err);

        const file = req.files.file;

        if (!file.mimetype.startsWith('image')) next(err);
        if (file.size > process.env.MAX_FILE_SIZE) next(err);

        file.name = `photo_${req.params.itemId}${path.parse(file.name).ext}`;

        const filePath = process.env.FILE_UPLOAD_PATH + file.name;

        file.mv(filePath, async err => {
            await item.findByIdAndUpdate(req.params.itemId, {
                image: file.name,
            });
            res.status(200)
                .setHeader('Content-Type', 'application/json')
                .json({ message: 'Image uploaded!' });
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
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
};
