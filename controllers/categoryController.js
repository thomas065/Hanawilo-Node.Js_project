// For '/' Category endpoint

const getCategories = (req, res) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: 'Show all categories' });
};

const createCategory = (req, res) => {
    res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json({ message:`Created content from category name: ${req.body.categoryName} for gender: ${req.body.gender}` });
};

const putCategory = (req, res) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: `Put content from category name: ${req.body.categoryName} for gender: ${req.body.gender}` });
};

const deleteCategories = (req, res) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: `Deleted content from category name: ${req.body.categoryName} for gender: ${req.body.gender}` });
};

module.exports = { getCategories, createCategory, putCategory, deleteCategories };
