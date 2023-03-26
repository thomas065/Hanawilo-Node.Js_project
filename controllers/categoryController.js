// For '/' Category endpoint

const Category = require('../models/Category');

const getCategories = async (req, res, next) => {
    // query parameter
    const filter = {};
    const options = {};
    if (Object.keys(req.query).length) {
        const {
            sortByCategory,
            categoryName,
            gender,
            limit
        } = req.query;
        if (categoryName) filter.categoryName = true;
        if (gender) filter.gender = true;

        // pagination
        if(limit) options.limit = limit;
        if(sortByCategory) options.sort = {categoryName: sortByCategory};

        console.log(filter, options);
    }

    try {
        const categories = await Category.find({}, filter, options);
        res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json(categories);
    } catch (err) {
        next(err);
    }
};

const postCategory = async (req, res, next) => {

    try {
        const category = await Category.create(req.body);
        res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json(category);
    } catch (err) {
        next(err);
    }
};

const deleteCategories = async (req, res, next) => {

    try {
        const deletedCategories = await Category.deleteMany();
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json(deletedCategories);
    } catch (err) {
        next(err);
    }
};

// route for ./category/:categoryId'

const getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json(category);
    }
    catch (err) {
        next(err);
    }
};

const putCategory = async (req, res, next) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.categoryId, req.body, {new: true});
        res.status(201)
            .setHeader('Content-Type', 'application/json')
            .json(updateCategory);
    } catch (err) {
        next(err);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({deletedCategory});
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getCategories,
    postCategory,
    deleteCategories,
    getCategory,
    putCategory,
    deleteCategory,
};
