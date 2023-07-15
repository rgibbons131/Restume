const db = require("../db/connect");

const getUsers = async(req, res) => {
    try {
        const result = await db
        .getDb()
        .collection('users')
        .find();

        result.toArray().then((lists) => {
            res.status(200).json(lists);
        })
    } catch {
        res.sendStatus(500);
    }
}

const getSingleUser = async(req, res, next) => {
    try {
        const result = await db
        .getDb()
        .collection('users')
        .findOne({_id: new ObjectId(req.params.id)});

        result.toArray().then((lists) => {
            res.status(200).json(lists);
        })
    } catch {
        res.sendStatus(500);
    }
}

module.exports = {
    getUsers,
    getSingleUser
};