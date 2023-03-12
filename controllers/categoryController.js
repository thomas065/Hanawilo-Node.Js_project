// For '/' Category endpoint

const getCategories = (req, res, next) => {
    // query parameter
    if (Object.keys(req.query).length) {
        const category = req.query.category;
        console.log(`Searching for Category: ${category}`);
    }

    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: 'Show all categories' });
};

const postCategory = (req, res, next) => {
    res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            message: `Created content from category name: ${req.body.categoryName} for gender: ${req.body.gender}`,
        });
};

const deleteCategories = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            message: `Deleted content from category name: ${req.body.categoryName} for gender: ${req.body.gender}`,
        });
};

// route for ./category/:categoryId'

const getCategory = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: `Show category with id: ${req.params.categoryId}` });
};

const putCategory = (req, res, next) => {
    res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            message: `Updated category with id: ${req.params.categoryId}`,
        });
};

const deleteCategory = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            message: `Deleted category with id: ${req.params.categoryId}`,
        });
};

module.exports = {
    getCategories,
    postCategory,
    deleteCategories,
    getCategory,
    putCategory,
    deleteCategory,
};
