const getUsers = (req, res, next) => {
    // query parameter
    if (Object.keys(req.query).length) {
        const users = req.query.user;
        console.log(`Searching for User: ${users}`);
    }
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: 'Found User' });
};

const postUser = (req, res, next) => {
    res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            message: `Created User with name of : ${req.body.userName}`,
        });
};

const deleteUsers = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: 'Deleted User', User });
};

// route for ./user/:userId'

const getUser = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: `Show User with id: ${req.params.userId}` });
};

const putUser = (req, res, next) => {
    res.status(201)
        .setHeader('Content-Type', 'application/json')
        .json({
            message: `Updated User with id: ${req.params.userId}`,
        });
};

const deleteUser = (req, res, next) => {
    res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ message: `Deleted User with id: ${req.params.userId}` });
};

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    putUser,
    deleteUser,
};
