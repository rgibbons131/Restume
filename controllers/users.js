const db = require("../db/connect");
const ObjectId = require('mongodb').ObjectId;

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

        res.send(result).status(200);
        if (!result) {
            console("There was no result.")
        }
    } catch {
        res.send('didnt work.')
    }
}

module.exports = {
    getUsers,
    getSingleUser
};