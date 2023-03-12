const getItems = (req, res, next) => {
    // query parameter

    if (Object.keys(req.query).length) {
        const { gender, price, isClearance, colors, sizes } = req.query;

        const filter = [];

        if (gender) filter.push(gender);
        if (price) filter.push(price);
        if (isClearance) filter.push(isClearance);
        if (colors) filter.push(colors);
        if (sizes) filter.push(sizes);

        for (const query of filter) {
            console.log(`Searching item by ${query}`);
        }
    }

    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: 'Found Items' });
};

const postItem = (req, res, next) => {
    res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            message: `Created item with name of : ${req.body.itemName} and item description of: ${req.body.itemdescription}`,
        });
};

const deleteItems = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: 'Deleted Items', Items });
};

// route for ./item/:itemId'

const getItem = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: `Show Item with id: ${req.params.itemId}` });
};

const putItem = (req, res, next) => {
    res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            message: `Updated Item with id: ${req.params.itemId}`,
        });
};

const deleteItem = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: `Deleted Item with id: ${req.params.itemId}` });
};

module.exports = {
    getItems,
    postItem,
    deleteItems,
    getItem,
    putItem,
    deleteItem,
};
